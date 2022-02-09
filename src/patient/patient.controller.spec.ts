import { Test, TestingModule } from '@nestjs/testing';
import { CreatePatientDto, FilterPatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { v4 as uuidv4 } from 'uuid';

const patientId = uuidv4();

describe('PatientController', () => {
  let controller: PatientController;
  let service: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
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
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                name: 'testCat1',
                email: 'testBreed1',
                rating: 4,
              }),
            ),
            create: jest
              .fn()
              .mockImplementation((therapist: CreatePatientDto) =>
                Promise.resolve({ ...therapist }),
              ),
            update: jest
              .fn()
              .mockImplementation((id: string, patient: UpdatePatientDto) =>
                Promise.resolve({ id, ...patient }),
              ),

            remove: jest.fn().mockResolvedValue({
              data: { name: 'aadd', email: '' },
              success: true,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<PatientController>(PatientController);
    service = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getTherapists', () => {
    it('should get an array of therapist', async () => {
      const filterPatientDto: FilterPatientDto = {
        active: true,
      };
      await expect(controller.findAll(filterPatientDto)).resolves.toEqual([
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
  describe('newPatient', () => {
    it('should create a new Patient', async () => {
      const createPatientDto: CreatePatientDto = {
        name: 'taull',
        email: 'taull@gmail.com',
      };
      await expect(controller.create(createPatientDto)).resolves.toEqual({
        ...createPatientDto,
      });
    });
  });
  describe('updatePatient', () => {
    it('should update a patient', async () => {
      const newPatientDTO: UpdatePatientDto = {
        name: 'New Cat 1',
        email: 'hshgdsh',
      };
      await expect(
        controller.update(patientId, newPatientDTO),
      ).resolves.toEqual({
        id: patientId,
        ...newPatientDTO,
      });
    });
  });
  describe('getById', () => {
    it('should get a single patient', async () => {
      await expect(controller.findOne('a strange id')).resolves.toEqual({
        name: 'testCat1',
        email: 'testBreed1',
        rating: 4,
      });
    });
  });

  // describe('deletePatient', () => {
  //   it('should return that it deleted a patient', async () => {
  //     await expect(controller.remove('a uuid that exists')).resolves.toEqual({
  //       data: { name: 'aadd', email: '' },
  //       success: true,
  //     });
  //   });
  //   it('should return that it did not delete a patient', async () => {
  //     const deleteSpy = jest
  //       .spyOn(service, 'remove')
  //       .mockResolvedValueOnce({ data:{name: 'aadd', email: ''},success:tru );
  //     await expect(
  //       controller.remove('a uuid that does not exist'),
  //     ).resolves.toEqual({ deleted: false });
  //     expect(deleteSpy).toBeCalledWith('a uuid that does not exist');
  //   });
  // });
});
