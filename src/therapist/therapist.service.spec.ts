import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import TherapistController from './therapist.controller';
import { TherapistDto } from './therapist.dto';
import { TherapistService } from './therapist.service';

const therapistArr = [
  {
    name: 'sanyam',
    email: 'sanyam1@gmail.com',
    imageUrl: null,
    about: 'fdghjdsfsdgjddfudsf',
    onboarded: false,
    consultationFee: 1000,
    id: 'ckytod6370000nd3gmw8wml77',
  },
];
const oneTherapist = therapistArr[0];
const db = {
  therapist: {
    findMany: jest.fn().mockResolvedValue(therapistArr),
  },
};

describe('Therapist Service', () => {
  let service: TherapistService;
  let prisma: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // If you've looked at the complex sample you'll notice that these functions
      // are a little bit more in depth using mock implementation
      // to give us a little bit more control and flexibility in our tests
      // this is not necessary, but can sometimes be helpful in a test scenario
      providers: [
        TherapistService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<TherapistService>(TherapistService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getTherapists', () => {
    it('should get an array of therapist', async () => {
      const therapist = await service.getTherapist();
      console.log(therapist);
      expect(therapist.data).toEqual(therapistArr);
    });
  });
});
