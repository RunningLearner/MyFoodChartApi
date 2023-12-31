import { Module } from '@nestjs/common';
import { PostsController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Comment } from '../comment/entities/comment.entity';
import { PostFree } from './entities/post-free.entity';
import { PostFreeService } from './post-free.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Comment, PostFree])],
  controllers: [PostsController],
  providers: [PostFreeService],
})
export class PostFreeModule {}
