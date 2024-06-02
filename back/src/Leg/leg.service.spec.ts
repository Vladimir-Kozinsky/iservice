import { Test, TestingModule } from '@nestjs/testing';
import { LegService } from './leg.service';

describe('LegService', () => {
  let service: LegService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LegService],
    }).compile();

    service = module.get<LegService>(LegService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
