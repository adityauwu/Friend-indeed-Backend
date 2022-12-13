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
import { FetchConversationDTO } from './dto/fetch-conversation.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post('saveConversation/')
  @UseGuards(JwtAuthGuard)
  create(
  
    @Body() createConversationDTO: CreateConversationDTO,
  ) {
    return this.conversationService.saveConversation(createConversationDTO);
  }

//  @Get('fetchConversation')
//   @UseGuards(JwtAuthGuard)
//   read(
//     @Param('therapist') Therapist: any,
//     @Param('patient') Patient : any
    
//   ) {
//     return this.conversationService.getConversation(Therapist,Patient);
//   }

  // @Get('fetchConversation')
  
  // getConversation(@Body() input: FetchConversationDTO) {
  //   return this.conversationService.getConversation(input)
  // }


  @Get('fetchConversation/:senderId/:recieverId')
  
  async findVersionUser(@Param('senderId') senderId: string, @Param('recieverId') recieverId: string) {
    return this.conversationService.getConversation(senderId, recieverId);
  }


  // @Get('/:id/therapist')
  // therapistFeedbacks(@Param('id') id: string, @Query('role') role: User) {
  //   return this.feedbackService.therapistFeedbacks(id, role)
  // }


}
