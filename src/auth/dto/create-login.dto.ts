import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLoginDto {
    
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  email: string;
 
  @ApiProperty()
  @IsString()
  imageUrl: string;
  
}
