import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { TherapistService } from './therapist.service';
import { FiltersDto, TherapistDto } from './therapist.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('therapist')
@ApiTags('Therapist')
export default class TherapistController {
  constructor(private readonly therapistService: TherapistService) {}

  @Post()
  async createTherapist(@Body() input) {
    return this.therapistService.createTherapist(input);
  }

  @Get()
  async getAllTherapists(@Query() query: FiltersDto) {
    return this.therapistService.getAllTherapists(query);
  }

}