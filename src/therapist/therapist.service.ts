
import { Injectable, Logger } from '@nestjs/common';
import { FiltersDto, TherapistDto } from './therapist.dto';
import { PrismaService } from '../common/services/prisma.service';
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
      return { error: e.message, success: false }
    }
  }

  async getAllTherapists(query: FiltersDto) {
    try {
      let q: any = { onboarded: true }
      if(query.category) q = { ...q, categories: { some: { categoryId: query.category } } }
      if(query.rating) q = { ...q, rating: { lte: parseInt(query.rating) } }
      if(query.experience) q = { ...q, experience: { lte: parseInt(query.experience) } }
      if(query.fee) q = { ...q, consultationFee: { lte: parseInt(query.fee) } }

      const data = await this.prismaService.therapist.findMany({
        where: { 
          ...q
        },
        include: { categories: { include: { category: true } } }
      })
      return {  data, success: true }
    } catch (e) {
      Logger.error(e.message);
      return { error: e.message, success: false }
    }
  }

  async updateTherapist(id: string, input: Partial<TherapistDto>) {
    try {
      const updated = await this.prismaService.therapist.update({
        where: { id },
        data: { ...input }
      })
      return { data: updated, success: true }
    } catch (e) {
      Logger.error(e.message);
      return { error: e.message, success: false }
    }
  }

  
}

