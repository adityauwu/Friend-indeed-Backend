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
  imageUrl?: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsBoolean()
  @IsOptional()
  onboarded?: boolean;

  @IsOptional()
  @IsNumber({}, { each: true })
  categoryIds?: number[];
}
