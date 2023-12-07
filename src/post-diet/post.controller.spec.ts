import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './post.controller';
import { PostDietService } from './post-diet.service';

describe('BoardController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostDietService],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
