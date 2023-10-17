import { Module } from '@nestjs/common';
import { BoardDietService } from './board-diet.service';
import { BoardController } from './board.controller';
import { BoardServiceFactory } from './ board-service.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [BoardController],
  providers: [BoardServiceFactory, BoardDietService],
})
export class BoardModule {}
