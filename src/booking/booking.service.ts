import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../common/services/prisma.service';
import { User } from '../common/enums';
import { BookingStatus, CreateBookingDto, FilterBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(private prismaService: PrismaService) {}

  async create(input: CreateBookingDto) {
    try {
      return {
        data: await this.prismaService.booking.create({ data: { ...input } }),
        success: true,
      };
    } catch (e) {
      Logger.error(e.message);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          error: 'Uh oh! This category already exists!',
          success: false,
        };
      }
      return { error: e.message, success: false };
    }
  }

  async findAll({ status }: FilterBookingDto) {
    try {
      return {
        data: await this.prismaService.booking.findMany({
          where: {
            status,
          },
          orderBy: {
            createdAt: 'desc',
          },
        }),
        success: true,
      };
    } catch (e) {
      Logger.error(e.message);
      return { error: e.message, success: false };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  async update(id: string, input: UpdateBookingDto) {
    try {
      return {
        data: await this.prismaService.booking.update({
          where: { id },
          data: { ...input },
        }),
        success: true,
      };
    } catch (e) {
      Logger.error(e.message);
      return { error: e.message, success: false };
    }
  }

  async remove(id: string) {
    try {
      return {
        data: await this.prismaService.booking.delete({
          where: { id },
        }),
        success: true,
      };
    } catch (e) {
      Logger.error(e.message);
      return { error: e.message, success: false };
    }
  }

  async upcomingMeetings(userId: string, role: User) {
    try {
      let roleMap = {
        [User.patient]: 'patientId',
        [User.therapist]: 'therapistId'
      }
      const data = await this.prismaService.booking.findMany({
        where: {
          [roleMap[role]]: userId,
          status: BookingStatus.BOOKED
        },
        orderBy: {
          updatedAt: 'desc'
        },
        include: {
          patient: true,
          therapist: true
        },
        skip: 0,
        take: 3
      })
      return { data, success: true }
    } catch (e) {
      Logger.error(e.message)
      return { error: e.message, success: false };
    }
  }
}


