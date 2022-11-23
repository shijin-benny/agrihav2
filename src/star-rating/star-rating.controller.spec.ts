import { Test, TestingModule } from '@nestjs/testing';
import { StarRatingController } from './star-rating.controller';
import { StarRatingService } from './star-rating.service';

describe('StarRatingController', () => {
  let controller: StarRatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarRatingController],
      providers: [StarRatingService],
    }).compile();

    controller = module.get<StarRatingController>(StarRatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
