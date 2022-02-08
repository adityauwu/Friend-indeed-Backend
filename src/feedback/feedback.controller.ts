import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Get,
  Put,
  Query
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../common/enums';
import { FeedbackDto, UpdateFeedbackDto } from './feedback.dto';
import { FeedbackService } from './feedback.service';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(
    private feedbackService: FeedbackService
  ) {}

  @Post()
  addFeedback(@Body() input: FeedbackDto) {
    return this.feedbackService.addFeedback(input)
  }

  @Get('/:id/therapist')
  therapistFeedbacks(@Param('id') id: string, @Query('role') role: User) {
    return this.feedbackService.therapistFeedbacks(id, role)
  }

  @Put(':id')
  editFeedback(@Param('id') id: string, @Body() input: UpdateFeedbackDto) {
    return this.feedbackService.editFeedback(id, input)
  }

  @Delete(':id')
  @HttpCode(204)
  removeFeedback(@Param('id') id: string, @Query('therapistId') therapistId: string) {
    return this.feedbackService.removeFeedback(id, therapistId)
  }
  
}
