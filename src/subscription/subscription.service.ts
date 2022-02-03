import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma.service';
import {
  CreateSubscriptionDto,
  FilterSubscriptionDto,
} from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';


@Injectable()
export class SubscriptionService {
  constructor(private prismaService: PrismaService) {}

  async create(input: CreateSubscriptionDto) {
    try {
      return {
        data: await this.prismaService.subscription.create({ data: { ...input } }),
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

  async findAll({ active }: FilterSubscriptionDto) {
    try {
      return {
        data: await this.prismaService.subscription.findMany({
          where: { active },
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

  async update(id: string, input: UpdateSubscriptionDto) {
    try {
      return {
        data: await this.prismaService.subscription.update({
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
        data: await this.prismaService.subscription.delete({
          where: { id },
        }),
        success: true,
      };
    } catch (e) {
      Logger.error(e.message);
      return { error: e.message, success: false };
    }
  }
}
