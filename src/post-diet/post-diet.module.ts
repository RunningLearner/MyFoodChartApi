import { Module } from '@nestjs/common';
import { PostDietService } from './post-diet.service';
import { PostsController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { PostDiet } from './entities/post-diet.entity';
import { User } from '../user/entities/user.entity';
import { Comment } from '../comment/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostDiet, Menu, User, Comment])],
  controllers: [PostsController],
  providers: [PostDietService],
})
export class PostDietModule {}
