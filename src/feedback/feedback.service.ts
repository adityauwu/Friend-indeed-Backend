import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { FeedbackDto } from './feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private prismaService: PrismaService) {}

  async addFeedback(input: FeedbackDto) {
    try {
      return {
        data: await this.prismaService.feedback.create({ data: { ...input } }),
        success: true,
      };
    } catch (e) {
      Logger.error(e.message);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          return {
            error: "Uh oh! You've already added a comment!",
            success: false,
          };
        }
      }
      return { error: e.message, success: false };
    }
  }
}
