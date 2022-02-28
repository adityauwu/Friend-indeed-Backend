import { Body, Controller, Get, Post, Query, Param, Put } from '@nestjs/common';
import { TherapistService } from './therapist.service';
import {
  FiltersDto,
  PatientFiltersDto,
  TherapistDto,
  UpdateTherapistDto,
} from './therapist.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Therapist')
@Controller('therapist')
export default class TherapistController {
  constructor(private readonly therapistService: TherapistService) {}

  @Post()
  createTherapist(@Body() input: TherapistDto) {
    return this.therapistService.createTherapist(input);
  }

  @Get()
  getAllTherapists(@Query() query: FiltersDto) {
    return this.therapistService.getAllTherapists(query);
  }

  @Get(':id')
  getTherapistById(@Param('id') id: string) {
    return this.therapistService.getTherapistById(id);
  }

  @Put(':id')
  updateTherapist(@Param('id') id: string, @Body() input: UpdateTherapistDto) {
    return this.therapistService.updateTherapist(id, input);
  }

  @Get(':id/patients')
  getTherapistPatients(
    @Param('id') id: string,
    @Query() query: PatientFiltersDto,
  ) {
    return this.therapistService.getTherapistPatients(id, query);
  }

}
