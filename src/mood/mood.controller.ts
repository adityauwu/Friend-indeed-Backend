import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
  
  import { MoodService } from './mood.service';
  //import { CreateFriendDto } from './dto/create-friend.dto';

  import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateMoodDto } from './dto/create-mood.dto';
  
  @ApiTags('mood')
  @ApiBearerAuth()
  //@UseGuards(JwtAuthGuard)
  @Controller('mood')
  export class MoodController {
    constructor(private moodService: MoodService) {}
  
    // @Post()
    // create(@Body() createFriendDto: CreateFriendDto) {
    //   return this.friendService.create(createFriendDto);
    // }
    
    // // @Post()
    // // create(@Body() createPatientDto: CreateFriendDto) {
    // //   return this.patientService.create(createPatientDto);
    // // }
  
    // // @Get()
    // // findAll(@Query() query: FilterPatientDto) {
    // //   return this.patientService.findAll(query);
    // // }
  
    @Post('/updateMood/:id')
    findAllFriends(@Param('id') id: string, @Body() UserMood: CreateMoodDto) {
      return this.moodService.updateMood(id,UserMood);
    }
  
    @Get('/getMood/:userId')
      checkfriendship(@Param('userId') userId: string ){
        return this.moodService.getMood(userId);
      }
    

    // // @Patch(':id')
    // // update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    // //   return this.patientService.update(id, updatePatientDto);
    // // }
  
    // @Delete('/unfollow/:uuId')
    // remove(@Param('uuId') uuId: string) {
    //   return this.friendService.remove(uuId);

    // }
    // @Get('/find/:userId/:friendId')
    //   checkfriendship(@Param('userId') userId: string, @Param('friendId') friendId: string){
    //     return this.friendService.checkfriendship(userId,friendId);
    //   }

  }