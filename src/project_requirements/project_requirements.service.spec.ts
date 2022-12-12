import { Test, TestingModule } from '@nestjs/testing';
import { ProjectRequirementsService } from './project_requirements.service';

describe('ProjectRequirementsService', () => {
  let service: ProjectRequirementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectRequirementsService],
    }).compile();

    service = module.get<ProjectRequirementsService>(ProjectRequirementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
