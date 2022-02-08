import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma.service';
import { User } from '../common/enums';
import { CreatePatientDto, FilterPatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(private prismaService: PrismaService) {}

  async create(input: CreatePatientDto) {
    try {
      return {
        data: await this.prismaService.patient.create({ data: {
          ...input,
          imageUrl: `https://avatars.dicebear.com/api/identicon/${input.name}.svg`
        } }),
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

  async findAll({ active }: FilterPatientDto) {
    try {
      return {
        data: await this.prismaService.patient.findMany({ where: { active } }),
        success: true,
      };
    } catch (e) {
      Logger.error(e.message);
      return { error: e.message, success: false };
    }
  }

  async findOne(id: string) {
    try {
      const res = await this.prismaService.patient.findUnique({
        where: { id },
      })
      return {
        data: { ...res, role: User.patient },
        success: true,
      };
    } catch (e) {
      Logger.error(e.message);
      return { error: e.message, success: false };
    }
  }

  async update(id: string, input: UpdatePatientDto) {
    try {
      return {
        data: await this.prismaService.patient.update({
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
        data: await this.prismaService.patient.delete({
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
