import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardService } from './board.service';

@Injectable()
export class BoardServiceFactory {
  constructor(private readonly boardService: BoardService) {}

  getService(type: string) {
    // if (type === 'A') {
    //   return this.boardAService;
    // } else if (type === 'B') {
    //   return this.boardBService;
    // } else {
    //   throw new NotFoundException('Invalid board type');
    // }
  }
}
