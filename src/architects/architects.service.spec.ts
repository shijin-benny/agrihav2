import { Test, TestingModule } from '@nestjs/testing';
import { ArchitectsService } from './architects.service';

describe('ArchitectsService', () => {
  let service: ArchitectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArchitectsService],
    }).compile();

    service = module.get<ArchitectsService>(ArchitectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
