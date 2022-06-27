import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MarkAsReadConversationDTO {
  @IsNotEmpty()
  @ApiProperty()
  senderId: number;

  @IsNotEmpty()
  @ApiProperty()
  receiverId: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  createdAt: Date;
}