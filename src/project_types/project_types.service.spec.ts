import { Test, TestingModule } from '@nestjs/testing';
import { ProjectTypesService } from './project_types.service';

describe('ProjectTypesService', () => {
  let service: ProjectTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectTypesService],
    }).compile();

    service = module.get<ProjectTypesService>(ProjectTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
