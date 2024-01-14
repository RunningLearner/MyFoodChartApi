import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { UserService } from '../user/user.service';
import { PostDietService } from '../post-diet/post-diet.service';
import { Like } from './entities/like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { PostDiet } from '../post-diet/entities/post-diet.entity';
import { Menu } from '../post-diet/entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like, User, PostDiet, Menu])],
  controllers: [LikeController],
  providers: [LikeService, UserService, PostDietService],
})
export class LikeModule {}
