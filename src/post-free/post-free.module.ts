import { Module } from '@nestjs/common';
import { PostsController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { CommentFree } from '../comment/entities/comment-free.entity';
import { PostFree } from './entities/post-free.entity';
import { PostFreeService } from './post-free.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, CommentFree, PostFree])],
  controllers: [PostsController],
  providers: [PostFreeService],
})
export class PostFreeModule {}
