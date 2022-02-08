import { Injectable, Logger } from '@nestjs/common';

import { FiltersDto, PatientFiltersDto, TherapistDto, UpdateTherapistDto } from './therapist.dto';
import { PrismaService } from '../common/services/prisma.service';
import { BookingStatus } from '../booking/dto/create-booking.dto';
import { User } from '../common/enums';
@Injectable()
export class TherapistService {

  PAGE_LIMIT: number

  constructor(private readonly prismaService: PrismaService) {
    this.PAGE_LIMIT = 10
  }

  async createTherapist(input: TherapistDto) {
    try {
      return {
        data: await this.prismaService.therapist.create({ data: input }),
        success: true,
      };
    } catch (e) {
      Logger.error(e.message);
      return { error: e.message, success: false };
    }
  }
  async getTherapist() {
    return {
      data: await this.prismaService.therapist.findMany(),
      success: true,
    };
  }
  async getAllTherapists(query: FiltersDto) {
    try {
      let q: any = { onboarded: true, active: true };
      if (query.category)
        q = { ...q, categories: { some: { categoryId: query.category } } };
      if (query.rating) q = { ...q, rating: { lte: query.rating } };
      if (query.experience) q = { ...q, experience: { lte: query.experience } };
      if (query.fee) q = { ...q, consultationFee: { lte: query.fee } };

      const [data, count] = await Promise.all([
        this.prismaService.therapist.findMany({
          where: {
            ...q,
          },
          include: {
            categories: { include: { category: true } },
          },
          skip: (query.page-1) * this.PAGE_LIMIT,
          take: this.PAGE_LIMIT,
        }),
        this.prismaService.therapist.count({
          where: {
            ...q,
          },
        })
      ]);
      return { data: { data, count }, success: true };
    } catch (e) {
      Logger.error(e.message);
      return { error: e.message, success: false };
    }
  }

  async getTherapistById(id: string) {
    try {
      const res = await this.prismaService.therapist.findUnique({
        where: { id },
        include: { categories: { include: { category: true } }, feedback: false },
      })
      return {
        data: { ...res, role: User.therapist, bookingUrl: 'https://calendly.com/joelvinaykumar/15min' },
        success: true,
      };
    } catch (e) {
      throw e.message;
    }
  }

  async updateTherapist(id: string, input: UpdateTherapistDto) {
    try {
      const updated = await this.prismaService.therapist.update({
        where: { id },
        data: { ...input },
      });
      return { data: updated, success: true };
    } catch (e) {
      Logger.error(e.message);
      return { error: e.message, success: false };
    }
  }
  //filter booking status completed and include patients from it
  async getTherapistPatients(id: string, { patientName }: PatientFiltersDto) {
    try {
      return {
        data: await this.prismaService.booking.findMany({
          where: {
            status: BookingStatus.COMPLETED,
            therapistId: id,
            patient: {
              active: true,
              name: {
                search: patientName,
              },
            },
          },
          include: { patient: true },
          distinct: ['patientId'],
        }),
        success: true,
      };
    } catch (e) {
      Logger.error(e.message);
      return { error: e.message, success: false };
    }
  }
}
