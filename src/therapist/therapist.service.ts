
import { Injectable, Logger } from '@nestjs/common';
import { FiltersDto, TherapistDto } from './therapist.dto';
import { PrismaService } from '../common/services/prisma.service';
import { Prisma, Therapist } from '@prisma/client';

@Injectable()
export class TherapistService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTherapist(input: TherapistDto) {
    try {
      return {
        data: await this.prismaService.therapist.create({ data: input }),
        success: true
      }
    } catch (e) {
      Logger.error(e.message)
      return {
        error: e.message,
        success: false
      }
    }
  }

  async getAllTherapists(query: FiltersDto) {
    try {
      const data = await this.prismaService.therapist.findMany({
        where: { 
          categories: { some: { categoryId: query.category } },
          onboarded: true,
          consultationFee: { lte: parseInt(query.fee) },
        },
        include: { categories: { include: { category: true } } }
      })
      return {  data, success: true }
    } catch (e) {
      Logger.error(e.message);
      return { error: e.message, success: false }
    }
  }

  
}

