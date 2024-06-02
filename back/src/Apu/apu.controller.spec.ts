import { Test, TestingModule } from '@nestjs/testing';
import { ApuController } from './apu.controller';

describe('ApuController', () => {
  let controller: ApuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApuController],
    }).compile();

    controller = module.get<ApuController>(ApuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
