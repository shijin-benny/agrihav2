import { Test, TestingModule } from '@nestjs/testing';
import { RequirementlistController } from './requirementlist.controller';
import { RequirementlistService } from './requirementlist.service';

describe('RequirementlistController', () => {
  let controller: RequirementlistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequirementlistController],
      providers: [RequirementlistService],
    }).compile();

    controller = module.get<RequirementlistController>(RequirementlistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
