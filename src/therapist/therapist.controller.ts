import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TherapistService } from './therapist.service';
import { TherapistDto } from './therapist.dto';

@Controller('therapist')
export default class TherapistController {
  constructor(private readonly therapistService: TherapistService) {}

  @Post()
  async createTherapist(@Body() therapist: TherapistDto) {
    return this.therapistService.createTherapist(therapist);
  }

  @Get()
  async findTherapist() {
    return this.therapistService.findTherapist();
  }


}