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

  @IsString()
  @IsOptional()
  rating?: string;

  @IsString()
  @IsOptional()
  fee?: string;

  @IsString()
  @IsOptional()
  experience?: string;

  @IsString()
  @IsOptional()
  category?: string;
}