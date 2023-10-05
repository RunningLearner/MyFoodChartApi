import { Module } from '@nestjs/common';
import { BoardDietService } from './board-diet.service';
import { BoardController } from './board.controller';

@Module({
  controllers: [BoardController],
  providers: [BoardDietService],
})
export class BoardModule {}
