import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConversationDTO {
  @IsNotEmpty()
  @ApiProperty()
  senderId: string;

  @IsNotEmpty()
  @ApiProperty()
  receiverId: string;

  @IsNotEmpty()
  @ApiProperty()
  content: string;




}
