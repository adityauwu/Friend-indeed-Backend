import { IsBoolean, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, MaxLength } from 'class-validator';
export class CreateMoodDto {
  @ApiProperty()
  @IsNumber()
  UserMood: number;

}