import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsInt, MaxLength, Max, Min } from 'class-validator';

export class FeedbackDto {
  @ApiProperty()
  @IsInt()
  @Max(5)
  @Min(0)
  rating: number;

  @ApiProperty()
  @IsString()
  @MaxLength(300)
  comment: string;

  @ApiProperty()
  @IsString()
  therapistId: string;

  @ApiProperty()
  @IsString()
  patientId: string;
}

export class UpdateFeedbackDto extends PartialType(FeedbackDto){}