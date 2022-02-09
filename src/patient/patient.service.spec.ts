import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { PatientService } from './patient.service';
import { CreatePatientDto, FilterPatientDto } from './dto/create-patient.dto';

const patientArr = [
  {
    name: 'sanyam',
    email: 'sanyam1@gmail.com',
    imageUrl: null,
    about: 'fdghjdsfsdgjddfudsf',
    id: 'ckytod6370000nd3gmw8wml77',
  },
];
const onePatient = patientArr[0];
const db = {
  patient: {
    findMany: jest.fn().mockResolvedValue(patientArr),
    findUnique: jest.fn().mockResolvedValue(onePatient),
    findFirst: jest.fn().mockResolvedValue(onePatient),
    create: jest.fn().mockReturnValue(onePatient),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(onePatient),
    delete: jest.fn().mockResolvedValue(onePatient),
  },
};
describe('PatientService', () => {
  let service: PatientService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
    prisma = module.get<PrismaService>(PrismaService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAll', () => {
    it('should return an array of patients', async () => {
      const filterPatientDto: FilterPatientDto = {
        active: true,
      };
      const patients = await service.findAll(filterPatientDto);
      expect(patients.data).toEqual(patientArr);
    });
  });

  // describe('getOne', () => {
  //   it('should get a single patient', () => {
  //     expect(service.findOne('a uuid')).resolves.toEqual(onePatient);
  //   });
  // });

  // describe('insertOne', () => {
  //   it('should successfully insert a patient', () => {
  //     expect(
  //       service.create({
  //         name: 'testCat1',
  //         email: 'jv@gmail.com'
  //       }),
  //     ).resolves.toEqual(onePatient);
  //   });
  // });

  // describe('updateOne', () => {
  //   it('should call the update method', async () => {
  //     const cat = await service.update('a uuid', {
  //       name: 'testCat1',
  //       email: '',

  //     });
  //     expect(cat).toEqual(onePatient);
  //   });
  // });

  // describe('deleteOne', () => {
  //   it('should return {deleted: true}', () => {
  //     expect(service.remove('a uuid')).resolves.toEqual({ deleted: true });
  //   });

  //   it('should return {deleted: false, message: err.message}', () => {
  //     const dbSpy = jest
  //       .spyOn(prisma.cat, 'delete')
  //       .mockRejectedValueOnce(new Error('Bad Delete Method.'));
  //     expect(service.deleteOne('a bad uuid')).resolves.toEqual({
  //       deleted: false,
  //       message: 'Bad Delete Method.',
  //     });
  //   });
});

