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
  
  import { FriendService } from './friend.service';
  import { CreateFriendDto } from './dto/create-friend.dto';

  import { JwtAuthGuard } from '../auth/jwt.guard';
  
  @ApiTags('addFriend')
  @ApiBearerAuth()
  //@UseGuards(JwtAuthGuard)
  @Controller('addFriend')
  export class FriendController {
    constructor(private friendService: FriendService) {}
  
    @Post()
    create(@Body() createFriendDto: CreateFriendDto) {
      return this.friendService.create(createFriendDto);
    }
    
    // @Post()
    // create(@Body() createPatientDto: CreateFriendDto) {
    //   return this.patientService.create(createPatientDto);
    // }
  
    // @Get()
    // findAll(@Query() query: FilterPatientDto) {
    //   return this.patientService.findAll(query);
    // }
  
    @Get('/fetchFriends/:userId')
    findAllFriends(@Param('userId') id: string) {
      return this.friendService.findAllFriends(id);
    }
  
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    //   return this.patientService.update(id, updatePatientDto);
    // }
  
    @Delete('/unfollow/:uuId')
    remove(@Param('uuId') uuId: string) {
      return this.friendService.remove(uuId);

    }
    @Get('/find/:userId/:friendId')
      checkfriendship(@Param('userId') userId: string, @Param('friendId') friendId: string){
        return this.friendService.checkfriendship(userId,friendId);
      }

  }
  