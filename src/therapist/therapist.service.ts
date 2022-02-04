import { Injectable, Logger } from '@nestjs/common';
import { FiltersDto, TherapistDto, UpdateTherapistDto } from './therapist.dto';
import { PrismaService } from '../common/services/prisma.service';
import { STATUS_CODES } from 'http';
import { Status } from 'src/booking/dto/create-booking.dto';
@Injectable()
export class TherapistService {
  constructor(private readonly prismaService: PrismaService) {}

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

      const data = await this.prismaService.therapist.findMany({
        where: {
          ...q,
        },
        include: {
          _count: true,
          categories: { include: { category: true } },
          feedback: true,
        },
      });
      return { data, success: true };
    } catch (e) {
      Logger.error(e.message);
      return { error: e.message, success: false };
    }
  }

  async getTherapistById(id: string) {
    try {
      return {
        data: await this.prismaService.therapist.findUnique({
          where: { id },
          include: { categories: true, feedback: true },
        }),
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
  async getTherapistPatients(id: string, patientName: string) {
    try {
      return {
        data: await this.prismaService.booking.findMany({
          where: {
            status: Status.COMPLETED,
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
