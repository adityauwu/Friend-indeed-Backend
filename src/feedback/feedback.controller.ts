import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FeedbackDto } from './feedback.dto';
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
}
