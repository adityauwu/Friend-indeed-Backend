import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'src/common/services/prisma.service';
import { Prisma } from '@prisma/client';
import { MailDto } from './mail.dto';
@Injectable()
export class MailService {

    constructor(private prismaService: PrismaService, private mailService: MailerService) { }
    async plainTextEmail(user:MailDto) {
        try {
            
           // console.log(user.email);
            const response = this.mailService.sendMail({
                to: user.email,
                from: 'rickpetersoncol2@gmail.com',
                subject: 'Friend in need is a Friend indeed',
                text: 'Thank you for Subcribing to our News Letter!'
            })
            console.log(response)
            return {
                data: await this.prismaService.newsletterSubs.create({ data: {
                  email: user.email,
                  name: user.name
                   // imageUrl: `https://avatars.dicebear.com/api/identicon/${input.name}.svg`,
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

}