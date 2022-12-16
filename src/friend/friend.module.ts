import { Module } from '@nestjs/common';

import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  controllers: [FriendController],
  providers: [FriendService, PrismaService],
})
export class FriendModule {}
