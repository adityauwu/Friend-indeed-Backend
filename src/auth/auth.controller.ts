import { Controller, Get, UseGuards, Post, Body, Query, Request } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';


import { User } from '../common/enums';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { CreateLoginDto } from './dto/create-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Query('role') role: User, @Body() CreateLoginDto: CreateLoginDto) {
    return this.authService.login(role, CreateLoginDto)
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
