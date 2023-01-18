import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { count } from 'console';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateFriendDto } from './dto/create-friend.dto';




@Injectable()
export class FriendService {
  constructor(private prismaService: PrismaService) {}

  async create(userId: string ,input: CreateFriendDto) {
    console.log(input + "----->" + userId);
    try {
      
       return {
        
        data: await this.prismaService.friend.create({ data: {
            friendId:input.id,
            friendName: input.name,
            imageUrl: input.imageUrl,
            userId : userId
        } }),
        success: true,
      };
    } catch (e) {
      Logger.error(e.message);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          error: 'Uh oh! This category already exists!',
          success: false,
        };
      }
      return { error: e.message, success: false };
    }
  }
  
  async findAllFriends(userId: string) {
      // const res = await this.prismaService.friend.findMany({
      //   where: { userId },
      // })
      //const size = await 
     try {
        const [data, count] = await Promise.all([
          this.prismaService.friend.findMany({
            where: {
              userId,
            },
          }),
          this.prismaService.friend.count({
            where: {
              userId,
            },
          }),
        ]);
        return { data: { data, count }, success: true };
      } catch (e) {
        Logger.error(e.message);
        return { error: e.message, success: false };
      }
  }


  async remove(id: string) {
    try {
      return {
        data: await this.prismaService.friend.delete({
          where: { id },
        }),
        success: true,
      };
    } catch (e) {
      Logger.error(e.message);
      return { error: e.message, success: false };
    }
  }

  async checkfriendship(userId: string, friendId : string) {
    try {
      const [data, count] = await Promise.all([
        this.prismaService.friend.findMany({
          where: {
            userId,
            friendId
          },
        }),
        this.prismaService.friend.count({
          where: {
            userId,
            friendId
          },
        }),
      ]);
      return { data: { data, count }, success: true };
    } catch (e) {
      Logger.error(e.message);
      return { error: e.message, success: false };
    }
  }
  // const upsertUser = await prisma.user.upsert({
  //   where: {
  //     email: 'viola@prisma.io',
  //   },
  //   update: {
  //     name: 'Viola the Magnificent',
  //   },
  //   create: {
  //     email: 'viola@prisma.io',
  //     name: 'Viola the Magnificent',
  //   },
  // })







}