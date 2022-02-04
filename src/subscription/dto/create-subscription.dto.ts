import { IsBoolean, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
export class CreateSubscriptionDto {
  @ApiProperty()
  @IsNumber()
  fee: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
export class FilterSubscriptionDto {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  active?: boolean;
}
