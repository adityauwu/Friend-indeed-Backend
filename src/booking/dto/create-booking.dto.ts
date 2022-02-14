import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, MaxLength } from 'class-validator';

export enum BookingStatus {
  PENDING = 'PENDING',
  BOOKED = 'BOOKED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
export class CreateBookingDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly fees: number;

  @ApiProperty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  patientId: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  therapistId: string;
}

//Base schema needs to be created and needs to be changed

export class FilterBookingDto {
  @ApiProperty({ required: false })
  @IsEnum(BookingStatus)
  @IsOptional()
  status?: BookingStatus;
}
