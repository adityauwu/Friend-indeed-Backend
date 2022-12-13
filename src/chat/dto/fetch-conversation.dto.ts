import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FetchConversationDTO {
  @IsNotEmpty()
  @ApiProperty()
  patientId: string;

  @IsNotEmpty()
  @ApiProperty()
  therapistId: string;

}
