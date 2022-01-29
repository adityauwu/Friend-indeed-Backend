import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';

describe('FeedbackController', () => {
  let controller: FeedbackController;
  let service: FeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackController],
      providers: [FeedbackService, PrismaService]
    }).compile();

    controller = module.get<FeedbackController>(FeedbackController);
    service = module.get<FeedbackService>(FeedbackService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw error if comment length exceeds 300', async () => {    
    expect(await controller.addFeedback({
      comment: Array(301).fill("a").join(""),
      rating: 0,
      patientId: "ckyyupp0n0020iwdlexhihsl6",
      therapistId: "ckyyuu91q0048iwdl6va133e9"
    })).toEqual({
      error: 'Uh oh! You\'ve already added a comment!',
      success: false
    })
  })
});
