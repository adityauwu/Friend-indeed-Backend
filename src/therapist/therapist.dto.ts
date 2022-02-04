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
  @IsInt()
  @IsOptional()
  consultationFee?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
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
  @Type(() => Number)
  rating?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  fee?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  experience?: number;

  @ApiProperty({ required: false, description: "Enter the id of category" })
  @IsString()
  @IsOptional()
  category?: string;
}
