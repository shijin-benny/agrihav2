import { Test, TestingModule } from '@nestjs/testing';
import { ProjectSubTypesController } from './project-sub_types.controller';
import { ProjectSubTypesService } from './project-sub_types.service';

describe('ProjectSubTypesController', () => {
  let controller: ProjectSubTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectSubTypesController],
      providers: [ProjectSubTypesService],
    }).compile();

    controller = module.get<ProjectSubTypesController>(ProjectSubTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
