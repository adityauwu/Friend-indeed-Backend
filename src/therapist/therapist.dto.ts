import {
  IsString,
  IsUrl,
  IsBoolean,
  IsOptional,
  IsInt,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class TherapistDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  about?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  consultationFee?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  experience?: number;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  onboarded?: boolean;
}

export class FiltersDto {

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  rating?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  fee?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  experience?: number;

  @ApiProperty({ required: false, description: "Enter the id of category" })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @Type(() => Number)
  page: number;
}

export class UpdateTherapistDto extends PartialType(TherapistDto) {};

export class PatientFiltersDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  patientName?: string;
} 
