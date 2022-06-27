import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateConversationDTO } from './dto/create-conversation.dto';
import { ChatGateway } from './chat.gateway';
import { chatGatewayConst } from '../../config/chat.config';

@Injectable()
export class ConversationService {
  constructor(private prismaService: PrismaService,private chatGateway: ChatGateway,) {}

  async saveConversation(input: CreateConversationDTO) {
    try {

      const conversation =  await this.prismaService.conversation.create({
        data: { ...input },
      })
      this.chatGateway.wss.emit(
        chatGatewayConst.newMessageToUserChannel + conversation.receiverId,
        conversation,
      ); 
      return {
        data: conversation,
        sucess: true,
      };
    } catch (e) {
      Logger.error(e.message);
    }
  }
}
