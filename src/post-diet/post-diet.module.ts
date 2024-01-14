import { Module } from '@nestjs/common';
import { PostDietService } from './post-diet.service';
import { PostsController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { PostDiet } from './entities/post-diet.entity';
import { User } from '../user/entities/user.entity';
import { Comment } from '../comment/entities/comment.entity';
import { LikeService } from '../like/like.service';
import { Like } from '../like/entities/like.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostDiet, Menu, User, Comment, Like])],
  controllers: [PostsController],
  providers: [PostDietService, LikeService, UserService],
})
export class PostDietModule {}
