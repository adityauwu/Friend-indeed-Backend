import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterConversation {
  @ApiPropertyOptional()
  before?: Date;

  @ApiPropertyOptional()
  after?: Date;

  @ApiPropertyOptional()
  limit?: number;

  @ApiPropertyOptional()
  page?: number;
}
