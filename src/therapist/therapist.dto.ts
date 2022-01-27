import {
  IsString,
  IsUrl,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class TherapistDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsUrl()
  @IsOptional()
  image_url?: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsBoolean()
  @IsOptional()
  onboarded?: boolean;

}

export class FiltersDto {

  @IsNumber()
  @IsOptional()
  rating?: number;

  @IsString()
  @IsOptional()
  fee?: string;

  @IsNumber()
  @IsOptional()
  experience?: number;

  @IsString()
  @IsOptional()
  category?: string;
}