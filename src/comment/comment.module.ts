import { Module } from '@nestjs/common';
import { CommentDietService } from './comment-diet.service';
import { CommentsController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostDiet } from '../post-diet/entities/post-diet.entity';
import { PostFree } from '../post-free/entities/post-free.entity';
import { User } from '../user/entities/user.entity';
import { CommentDiet } from './entities/comment-diet.entity';
import { CommentFree } from './entities/comment-free.entity';
import { CommentFreeService } from './comment-free.service';

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
  providers: [CommentDietService, CommentFreeService],
})
export class CommentModule {}
