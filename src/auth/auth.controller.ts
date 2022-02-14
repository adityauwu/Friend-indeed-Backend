import { Controller, Get, UseGuards, Post, Body, Query, Request } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';


import { User } from '../common/enums';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Query('role') role: User, @Body() input: any) {
    return this.authService.login(role, input)
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
