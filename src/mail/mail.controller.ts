import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt.guard';

import { User } from '../auth/user.decorator';

import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) { }

    
    @Get('subscribe-to-newsletter')
    
    @UseGuards(JwtAuthGuard)
    sendmail(@User() user){
      return this.mailService.plainTextEmail(user)
    }


}
