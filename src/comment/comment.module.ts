import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentsController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostDiet } from '../post-diet/entities/post-diet.entity';
import { PostFree } from '../post-free/entities/post-free.entity';
import { User } from '../user/entities/user.entity';
import { CommentDiet } from './entities/comment-diet.entity';
import { CommentFree } from './entities/comment-free.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostDiet,
      User,
      CommentDiet,
      CommentFree,
      PostFree,
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentService],
})
export class CommentModule {}
