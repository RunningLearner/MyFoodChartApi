import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostDietService } from './post-diet.service';

describe('BoardController', () => {
  let controller: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostDietService],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
