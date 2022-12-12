import { Test, TestingModule } from '@nestjs/testing';
import { PostsOldController } from './posts_old.controller';
import { PostsOldService } from './posts_old.service';

describe('PostsOldController', () => {
  let controller: PostsOldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsOldController],
      providers: [PostsOldService],
    }).compile();

    controller = module.get<PostsOldController>(PostsOldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
