import { IsBoolean, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, MaxLength } from 'class-validator';
export class CreateFriendDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  friendId: string;

  @ApiProperty()
  @IsString()
  friendName: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

}



// id           String        @id @default(uuid())
//  userId       String
//  friendId     String
//  friendName   String
//  imageUrl     String
//  followedOn   DateTime