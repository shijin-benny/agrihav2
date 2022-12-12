import { Test, TestingModule } from '@nestjs/testing';
import { ProjectRequirementsController } from './project_requirements.controller';
import { ProjectRequirementsService } from './project_requirements.service';

describe('ProjectRequirementsController', () => {
  let controller: ProjectRequirementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectRequirementsController],
      providers: [ProjectRequirementsService],
    }).compile();

    controller = module.get<ProjectRequirementsController>(ProjectRequirementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
