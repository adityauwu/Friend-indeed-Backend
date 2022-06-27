import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  imports: [
    
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: {
        expiresIn: `${60*60*6}s`,
      }
    }),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [ChatController],
  providers: [ConversationService, ChatGateway,PrismaService  ],
  exports: [ChatGateway],
})
export class ChatModule {}
