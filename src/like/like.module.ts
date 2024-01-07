import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { UserService } from '../user/user.service';
import { PostDietService } from '../post-diet/post-diet.service';

@Module({
  controllers: [LikeController],
  providers: [LikeService, UserService, PostDietService],
})
export class LikeModule {}
