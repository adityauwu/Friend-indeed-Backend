import { Test, TestingModule } from '@nestjs/testing';
import { ChatsubscriptionController } from './chatsubscription.controller';

describe('ChatsubscriptionController', () => {
  let controller: ChatsubscriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatsubscriptionController],
    }).compile();

    controller = module.get<ChatsubscriptionController>(ChatsubscriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
