import { Test, TestingModule } from '@nestjs/testing';
import { ProjectSubTypesService } from './project-sub_types.service';

describe('ProjectSubTypesService', () => {
  let service: ProjectSubTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectSubTypesService],
    }).compile();

    service = module.get<ProjectSubTypesService>(ProjectSubTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
