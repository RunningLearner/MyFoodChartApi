import { Module } from '@nestjs/common';
import { BoardDietService } from './board-diet.service';
import { BoardController } from './board.controller';
import { BoardServiceFactory } from './ board-service.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Post } from './entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Menu])],
  controllers: [BoardController],
  providers: [BoardServiceFactory, BoardDietService],
})
export class BoardModule {}
