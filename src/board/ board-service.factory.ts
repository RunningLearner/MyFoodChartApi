import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardDietService } from './board-diet.service';

@Injectable()
export class BoardServiceFactory {
  constructor(
    // private readonly boardAService: BoardAService,
    // private readonly boardBService: BoardBService,
    private readonly boardDietService: BoardDietService,
  ) {}

  getService(type: string) {
    if (type === 'diet') {
      return this.boardDietService;
    }
    // else if (type === 'A') {
    //   return this.boardAService;
    // } else if (type === 'B') {
    //   return this.boardBService;
    // }
    else {
      throw new NotFoundException('Invalid board type');
    }
  }
}
