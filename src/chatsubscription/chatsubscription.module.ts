import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { ChatsubscriptionController } from './chatsubscription.controller';
import { ChatsubscriptionService } from './chatsubscription.service';

@Module({
  controllers: [ChatsubscriptionController],
  providers: [ChatsubscriptionService,PrismaService]
})
export class ChatsubscriptionModule {}
