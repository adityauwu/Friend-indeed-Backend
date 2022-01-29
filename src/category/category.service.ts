import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { CategoryDto, FilterCategoryDto, TherapistCategoryDto, UpdateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {

  constructor(
    private prismaService: PrismaService
  ) {}

  async createCategory(input: CategoryDto) {
    try {
      return {
        data: await this.prismaService.category.create({ data: { ...input } }),
        success: true
      }
    } catch (e) {
      Logger.error(e.message)
      if(e instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          error: 'Uh oh! This category already exists!',
          success: false
        }
      }
      return { error: e.message, success: false }
    }
  }

  async updateCategory(id: string, input: UpdateCategoryDto) {
    try {
      return {
        data: await this.prismaService.category.update({ 
          where: { id },
          data: { ...input }
        }),
        success: true
      }
    } catch (e) {
      Logger.error(e.message)
      return { error: e.message, success: false }
    }
  }

  async getAllCategories({ active }: FilterCategoryDto) {
    try {
      return {
        data: await this.prismaService.category.findMany({ where: { active } }),
        success: true
      }
    } catch (e) {
      Logger.error(e.message)
      return { error: e.message, success: false }
    }
  }

  async addCategoryToTherapist(input: TherapistCategoryDto[]) {
    try {
      const res = await Promise.all(
        input.map(item => this.prismaService.therapistCategories.create({ data: item }))
      )
      return {
        data: res,
        success: true
      }
    } catch (e) {
      Logger.error(e.message)
      return { error: e.message, success: false }
    }
  }
}
