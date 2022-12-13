import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { MailController } from './mail.controller';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: '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',
        },
      }
    }),
  ],
  providers: [MailService,PrismaService],
  exports: [MailService],
  controllers: [MailController], // 👈 export for DI
})
export class MailModule {}

