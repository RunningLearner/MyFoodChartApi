import { Test, TestingModule } from '@nestjs/testing';
import { PostDietService } from './post-diet.service';

describe('BoardService', () => {
  let service: PostDietService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostDietService],
    }).compile();

    service = module.get<PostDietService>(PostDietService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
