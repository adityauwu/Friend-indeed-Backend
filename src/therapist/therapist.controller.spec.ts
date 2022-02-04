import { Test, TestingModule } from '@nestjs/testing';
import TherapistController from './therapist.controller';
import { TherapistDto } from './therapist.dto';
import { TherapistService } from './therapist.service';

describe('Therapist Controller', () => {
  let controller: TherapistController;
  let service: TherapistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TherapistController],
      // If you've looked at the complex sample you'll notice that these functions
      // are a little bit more in depth using mock implementation
      // to give us a little bit more control and flexibility in our tests
      // this is not necessary, but can sometimes be helpful in a test scenario
      providers: [
        {
          provide: TherapistService,
          useValue: {
            getTherapist: jest.fn().mockResolvedValue([
              {
                about: 'fdghjdsfsdgjddfudsf',
                consultationFee: 1000,
                email: 'sanyam1@gmail.com',
                id: 'ckytod6370000nd3gmw8wml77',
                imageUrl: null,
                name: 'sanyam',
                onboarded: false,
              },
            ]),
            getOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                name: 'testCat1',
                email: 'testBreed1',
                rating: 4,
                id,
              }),
            ),
            createTherapist: jest
              .fn()
              .mockImplementation((therapist: TherapistDto) =>
                Promise.resolve({ ...therapist }),
              ),

            deleteOne: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<TherapistController>(TherapistController);
    service = module.get<TherapistService>(TherapistService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getTherapists', () => {
    it('should get an array of therapist', async () => {
      await expect(controller.getTherapist()).resolves.toEqual([
        {
          name: 'sanyam',
          email: 'sanyam1@gmail.com',
          imageUrl: null,
          about: 'fdghjdsfsdgjddfudsf',
          onboarded: false,
          consultationFee: 1000,
          id: 'ckytod6370000nd3gmw8wml77',
        },
      ]);
    });
  });
  describe('newTherapist', () => {
    it('should create a new Therapist', async () => {
      const createTherapistDto: TherapistDto = {
        name: 'taull',
        email: 'taull@gmail.com',
        about: 'fdghjdsfiugfjsdgjddfudsf',
        onboarded: false,
      };
      await expect(
        controller.createTherapist(createTherapistDto),
      ).resolves.toEqual({
        ...createTherapistDto,
      });
    });
  });
});
