import { Injectable, Logger } from '@nestjs/common';

import { CreateConversationDTO } from './dto/create-conversation.dto';
import { FetchConversationDTO } from './dto/fetch-conversation.dto';
import { ChatGateway } from './chat.gateway';
import { chatGatewayConst } from '../../config/chat.config';
import { MarkAsReadConversationDTO } from './dto/markAsRead.dto';
import { PrismaService } from 'src/common/services/prisma.service';


@Injectable()
export class ConversationService {
  constructor(private prismaService: PrismaService,private chatGateway: ChatGateway,) {}

  async saveConversation(input: CreateConversationDTO) {
    try {

      const conversation =  await this.prismaService.conversation.create({
        data: {
          senderId: input.senderId,
          recieverId: input.receiverId,
          content : input.content 
        },
      })
      // this.chatGateway.wss.emit(
      //   chatGatewayConst.newMessageToUserChannel + conversation.receiverId,
      //   conversation,
      // ); 
      return {
        data: conversation,
        sucess: true,
      };
    } catch (e) {
      Logger.error(e.message);
    }
  }




  async getConversation(senderId:any, receiverId:any) {
    try {
      
      return {
        data: await this.prismaService.conversation.findMany({
          where: {
            OR: [
              {
                senderId: senderId,
                recieverId: receiverId 
              },
              {
                OR: {
                  senderId: receiverId,
                  recieverId: senderId 
                },
              },
            ],
          },
          //where:{},
          orderBy: { createdAt:"asc"},
          
        }),
        success: true,
      };
    } catch (e) {
      throw e.message;
    }
  }
  // async markAllBeforeAsRead(conversation: MarkAsReadConversationDTO) {
    
  //   const q = this.prismaService.conversation
  //   .update({  
  //   where: {
  //      senderId : 'viola@prisma.io',
  //   },
  //   data: {
  //     senderId: 'Viola the Magnificent',
  //   }, })
   
    
    
    //return this.prismaService.conversation.markAllBeforeAsRead(conversation);
  //}

}
