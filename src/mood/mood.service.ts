
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { count } from 'console';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateMoodDto } from './dto/create-mood.dto';

@Injectable()
export class MoodService {
    constructor(private prismaService: PrismaService) {}
    async updateMood(UserId: string, UserMood : CreateMoodDto) {
        try {
          return {
             upsertUser : await this.prismaService.mood.upsert({
                where: {
                  UserId: UserId,
                },
                update: {
                  userMood: UserMood.UserMood,
                },
                create: {
                  UserId: UserId,
                  userMood: UserMood.UserMood,
                },
              })
          };
        } catch (e) {
          Logger.error(e.message);
          return { error: e.message, success: false };
        }
      }


      async getMood(UserId: string) {
        try {
          return {
            data: await this.prismaService.mood.findUnique({
              where: { UserId },
            }),
            success: true,
          };
        } catch (e) {
          Logger.error(e.message);
          return { error: e.message, success: false };
        }
      }




}
