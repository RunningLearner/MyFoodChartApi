import { Module } from '@nestjs/common';
import { BoardDietService } from './board-diet.service';
import { BoardController } from './board.controller';
import { BoardServiceFactory } from './ board-service.factory';

@Module({
  controllers: [BoardController],
  providers: [BoardServiceFactory, BoardDietService],
})
export class BoardModule {}
