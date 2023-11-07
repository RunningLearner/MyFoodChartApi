import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostDiet } from '../post/entities/post-diet.entity';
import { User } from '../user/entities/user.entity';
import { CommentDiet } from './entities/comment-diet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostDiet, User, CommentDiet])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
