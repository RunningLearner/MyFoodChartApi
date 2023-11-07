import { Module } from '@nestjs/common';
import { BoardDietService } from './board-diet.service';
import { BoardController } from './board.controller';
import { BoardServiceFactory } from './ board-service.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { DietPost } from './entities/diet-post.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DietPost, Menu, User])],
  controllers: [BoardController],
  providers: [BoardServiceFactory, BoardDietService],
})
export class BoardModule {}
