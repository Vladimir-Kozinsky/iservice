import { Test, TestingModule } from '@nestjs/testing';
import { LegController } from './leg.controller';

describe('LegController', () => {
  let controller: LegController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LegController],
    }).compile();

    controller = module.get<LegController>(LegController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
