import { Test, TestingModule } from '@nestjs/testing';
import { RequirementlistService } from './requirementlist.service';

describe('RequirementlistService', () => {
  let service: RequirementlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequirementlistService],
    }).compile();

    service = module.get<RequirementlistService>(RequirementlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
