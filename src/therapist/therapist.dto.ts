import {
  IsString,
  IsUrl,
  IsBoolean,
  IsOptional,
  IsInt,
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
  @IsBoolean()
  @IsOptional()
  onboarded?: boolean;

}

export class FiltersDto {

  @ApiProperty({ required: false })
  @IsInt()
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

export class UpdateTherapistDto extends PartialType(TherapistDto) {};