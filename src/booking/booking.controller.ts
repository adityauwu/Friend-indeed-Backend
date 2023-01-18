import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { User } from '../common/enums';
import { BookingService } from './booking.service';
import { CreateBookingDto, FilterBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get()
  findAll(@Query() query: FilterBookingDto) {
    return this.bookingService.findAll(query);
  }

  @Get(':userId/upcoming-meetings')
  findUpcomingMeetings(@Param('userId') userId: string, @Query('role') role: string) {
    return this.bookingService.upcomingMeetings(userId, role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(id, updateBookingDto);
  }


  @Patch('confirmBooking/:id')
  confirmBooking(@Param('id') id: string) {
    return this.bookingService.confirmBooking(id);
  }


   @Get('findid/:orderId')
    findId(@Param('orderId') orderId : string){
      return this.bookingService.findId(orderId)
    }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(id);
  }
}
