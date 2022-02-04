import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class CategoryDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}

export class UpdateCategoryDto extends CategoryDto {}

export class FilterCategoryDto {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  active?: boolean;
}

export class TherapistCategoryDto {
  @ApiProperty()
  @IsString()
  therapistId: string;

  @ApiProperty()
  @IsString()
  categoryId: string;

  @ApiProperty()
  @IsNumber()
  experience: number;
}
