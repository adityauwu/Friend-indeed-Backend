import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class ChatsubscriptionService {
    constructor(private prismaService: PrismaService) {}
    async create(therapistId: string ,patientId: string) {
        //console.log(input + "----->" + userId);
        try {
          
           return {
            
            data: await this.prismaService.chatSubscription.create({ data: {
                patientId: patientId,
                therapistId :therapistId
                
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
      
      async findAllChatSubscription(userId: string) {
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
    
    
      async remove(patientId: string, therapistId : string) {
        try {
          return {
            data: await this.prismaService.chatSubscription.delete({
              where: { 
                patientId_therapistId : {patientId,therapistId}
              },
            }),
            success: true,
          };
        } catch (e) {
          Logger.error(e.message);
          return { error: e.message, success: false };
        }
      }
    
      async checkSubscription(patientId: string, therapistId : string) {
        try {
          const [data, count] = await Promise.all([
            this.prismaService.chatSubscription.findMany({
              where: {
                patientId,
                therapistId
              },
            }),
            this.prismaService.chatSubscription.count({
              where: {
                patientId,
                therapistId
              },
            }),
          ]);
          return { data: { data, count }, success: true };
        } catch (e) {
          Logger.error(e.message);
          return { error: e.message, success: false };
        }
      }

      async checkSubscription1(patientId: string, therapistId : string) {
        try {
          const data = await Promise.all([
          
            this.prismaService.chatSubscription.count({
              where: {
                patientId,
                therapistId
              },
            }),
          ]);

          
          
          return { data , success: true };
        } catch (e) {
          Logger.error(e.message);
          return { error: e.message, success: false };
        }
      }


      async chatSubscription(userId: string, role: string) {
          console.log(userId + "---we are here in fethcing subscriptions-------->");
          console.log(role)
    
        try {
          let roleMap = {
            ['Patient']: 'patientId',
            ['Therapist']: 'therapistId'
          }
          
          const data = await this.prismaService.chatSubscription.findMany({
            where: {
              [roleMap[role]]: userId,
              
            },
            orderBy: {
              SubscribedOn : 'desc'
            },
            include: {
             
              patient: role=='Therapist'?true:false,
              therapist: role=='Patient'?true:false
            },
            // skip: 0,
            // take: 3
          })
         // console.log("Fetching booked sessions for----->"+ userId+ "------>With the role--->"+ role+"--------->");
          //console.log(data);
          return { data, success: true }
        } catch (e) {
          Logger.error(e.message)
          return { error: e.message, success: false };
        }
      }


}
