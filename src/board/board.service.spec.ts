import { Test, TestingModule } from '@nestjs/testing';
import { BoardDietService } from './board-diet.service';

describe('BoardService', () => {
  let service: BoardDietService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardDietService],
    }).compile();

    service = module.get<BoardDietService>(BoardDietService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
