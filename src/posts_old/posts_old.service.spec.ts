import { Test, TestingModule } from '@nestjs/testing';
import { PostsOldService } from './posts_old.service';

describe('PostsOldService', () => {
  let service: PostsOldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsOldService],
    }).compile();

    service = module.get<PostsOldService>(PostsOldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
