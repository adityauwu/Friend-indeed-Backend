
import { Injectable } from '@nestjs/common';
import { TherapistDto } from './therapist.dto';
import { PrismaService } from '../common/services/prisma.service';

@Injectable()
export class TherapistService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTherapist(therapist: TherapistDto) {
    
    return this.prismaService.therapist.create({
      data: {
        name: therapist.name,
        email: therapist.email,
        imageUrl: therapist.imageUrl,
        about: therapist.about,

        categories: {
          create: [
            {
              category: {
                create: {
                  name: 'depression',
                },
              },
            },
            // { category: { connect: { id: '' } } },
          ],
        },
      },
      include: {
        categories: true,
      },
    });
  }

  async findTherapist() {
    return this.prismaService.therapist.findMany({
      where: {
        categories: {
          some: {
            category: {
              name: 'depression',
            },
          },
        },
      },
    })
  }

  
}

