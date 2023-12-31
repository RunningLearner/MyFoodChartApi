import { Module } from '@nestjs/common';
import { CommentDietService } from './comment.service';
import { CommentsController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostDiet } from '../post-diet/entities/post-diet.entity';
import { PostFree } from '../post-free/entities/post-free.entity';
import { User } from '../user/entities/user.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostDiet, User, Comment, PostFree])],
  controllers: [CommentsController],
  providers: [CommentDietService],
})
export class CommentModule {}
