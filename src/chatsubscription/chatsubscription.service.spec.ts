import { Test, TestingModule } from '@nestjs/testing';
import { ChatsubscriptionService } from './chatsubscription.service';

describe('ChatsubscriptionService', () => {
  let service: ChatsubscriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatsubscriptionService],
    }).compile();

    service = module.get<ChatsubscriptionService>(ChatsubscriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
