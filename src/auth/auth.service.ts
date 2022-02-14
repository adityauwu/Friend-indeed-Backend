import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../common/enums';
import { PrismaService } from '../common/services/prisma.service';

@Injectable()
export class AuthService {

  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService
  ) {}
  
  async login(role: User, input: any) {
    const { name, email, imageUrl } = input?.profileObj
    try {
      if(role === User.patient) {
        const foundUser = await this.prismaService.patient.findFirst({
          where: { email }
        })
        if(foundUser) {
          return { access_token: this.jwtService.sign(foundUser) }
        } else {
          const createdUser = await this.prismaService.patient.create({
            data: {
              name,
              email,
              imageUrl,
            }
          })
          return { access_token: this.jwtService.sign(createdUser) }
        }
      }
      const foundUser = await this.prismaService.therapist.findFirst({
        where: { email }
      })
      if(foundUser) {
        return { access_token: this.jwtService.sign(foundUser) }
      } else {
        const createdUser = await this.prismaService.therapist.create({
          data: {
            name,
            email,
            imageUrl,
          }
        })
        return { access_token: this.jwtService.sign(createdUser) }
      }
    } catch (e: any) {
      return new HttpException(e.message, 400)
    }
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
