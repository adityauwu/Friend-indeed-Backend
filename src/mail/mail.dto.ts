import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsInt, MaxLength, Max, Min } from 'class-validator';

export class MailDto {
 

  @ApiProperty()
  @IsString()
  @MaxLength(300)
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

}

export class UpdateMailDto extends PartialType(MailDto){}