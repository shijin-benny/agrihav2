import { Test, TestingModule } from '@nestjs/testing';
import { StarRatingService } from './star-rating.service';

describe('StarRatingService', () => {
  let service: StarRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarRatingService],
    }).compile();

    service = module.get<StarRatingService>(StarRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
