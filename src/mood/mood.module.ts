import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { MoodController } from './mood.controller';
import { MoodService } from './mood.service';

@Module({
  controllers: [MoodController],
  providers: [MoodService, PrismaService]
})
export class MoodModule {}
