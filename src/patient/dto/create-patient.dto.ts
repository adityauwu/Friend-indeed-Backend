import { IsBoolean, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, MaxLength } from 'class-validator';
export class CreatePatientDto {
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

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
export class FilterPatientDto {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  active?: boolean;
}
