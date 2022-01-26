import { Module } from '@nestjs/common';
import { TherapistService } from './therapist.service';
import TherapistController from './therapist.controller';
import { PrismaService } from '../common/services/prisma.service';

@Module({
  imports: [],
  controllers: [TherapistController],
  providers: [TherapistService, PrismaService],
})
export class TherapistModule {}
