import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostDiet } from 'src/post-diet/entities/post-diet.entity';
import { PostFree } from 'src/post-free/entities/post-free.entity';
import { CommentDiet } from 'src/comment/entities/comment-diet.entity';
import { CommentFree } from 'src/comment/entities/comment-free.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostDiet,
      PostFree,
      CommentDiet,
      CommentFree,
      User,
    ]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, UserService],
})
export class ProfileModule {}
