import {  IsNumber, IsOptional } from 'class-validator'

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  page?: number;
}