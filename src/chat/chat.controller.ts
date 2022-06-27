import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ConversationService } from './conversation.service';
import { CreateConversationDTO } from './dto/create-conversation.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post(':receiverId/sendMessage')
  @UseGuards(JwtAuthGuard)
  create(
    @Param('receiverId') receiverId: string,
    @Body() createConversationDTO: CreateConversationDTO,
  ) {
    return this.conversationService.saveConversation(createConversationDTO);
  }
}
