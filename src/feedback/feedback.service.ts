import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { User } from '../common/enums';
import { PrismaService } from '../common/services/prisma.service';
import { FeedbackDto, UpdateFeedbackDto } from './feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private prismaService: PrismaService) {}

  async addFeedback(input: FeedbackDto) {
    try {
      //  Insert Feedback
      const newFeedback = await this.prismaService.feedback.create({ data: { ...input } })
      //  Calculate average rating for therapist
      const response = await this.prismaService.feedback.aggregate({
        where: { therapistId: input.therapistId },
        _avg: { rating: true },
      })
      // Update rating for therapist
      await this.prismaService.therapist.update({
        where: { id: input.therapistId },
        data: {
          rating: response._avg.rating
        }
      })
      return {
        data: newFeedback,
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

  async therapistFeedbacks(id: string, role: User) {
    try {
      let roleMap = {
        [User.patient]: 'patientId',
        [User.therapist]: 'therapistId'
      }
      return {
        data: await this.prismaService.feedback.findMany({
          where: { [roleMap[role]]: id },
          orderBy: { createdAt: 'desc' },
          include: { patient: true }
        }),
        success: true,
      };
    } catch (e) {
      throw e.message;
    }
  }

  async editFeedback(id: string, input: UpdateFeedbackDto) {
    try {
      const updatedFeedback = await this.prismaService.feedback.update({ 
          where: { id },
          data: {
            rating: input.rating,
            comment: input.comment,
          }
        })
      const response = await this.prismaService.feedback.aggregate({
          where: { therapistId: input.therapistId },
          _avg: { rating: true },
          _count: { rating: true },
        })
      await this.prismaService.therapist.update({
        where: { id: input.therapistId },
        data: {
          rating: response._avg.rating
        }
      })
      return {
        data: updatedFeedback,
        success: true,
      };
    } catch (e) {
      Logger.error(e.message);
      return { error: e.message, success: false };
    }
  }

  async removeFeedback(id: string, therapistId: string) {
    try {
      
      await this.prismaService.feedback.delete({ where: { id } })
      const response = await this.prismaService.feedback.aggregate({
        where: { therapistId },
        _avg: { rating: true },
      })
      await this.prismaService.therapist.update({
        where: { id: therapistId },
        data: {
          rating: response._avg.rating
        }
      })
    } catch (e) {
      Logger.error(e.message)
      return { error: e.message, succes: false }
    }
  }
}
