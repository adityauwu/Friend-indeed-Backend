import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ChatsubscriptionService } from './chatsubscription.service';

@Controller('chatsubscription')
export class ChatsubscriptionController {
    constructor(private chatsSubscriptionService: ChatsubscriptionService) {}
  
    @Post('/subscribe/:therapistId')
    create(@Param('therapistId') therapistId: string, @Query('patientId') patientId: string) {
      
      return this.chatsSubscriptionService.create(therapistId,patientId);
    }
    
    // @Post()
    // create(@Body() createPatientDto: CreateFriendDto) {
    //   return this.patientService.create(createPatientDto);
    // }
  
    // @Get()
    // findAll(@Query() query: FilterPatientDto) {
    //   return this.patientService.findAll(query);
    // }
  
    @Get(':userId/fetchChatSubscription')
    findAllChatSubscription(@Param('userId') userId: string, @Query('role') role: string) {
      return this.chatsSubscriptionService.chatSubscription(userId,role);
    }
  
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    //   return this.patientService.update(id, updatePatientDto);
    // }
  
    @Delete('/unSubscribeChat/:therapistId')
    remove(@Query('patientId') patientId: string,@Param('therapistId') therapistId: string) {
      return this.chatsSubscriptionService.remove(patientId,therapistId);

    }
    @Get('/find/:therapistId')
      checkSubscription(@Param('therapistId') therapistId: string, @Query('userId') userId: string){
        return this.chatsSubscriptionService.checkSubscription1(userId,therapistId);
      }

}
