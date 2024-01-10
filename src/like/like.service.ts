import { Injectable } from '@nestjs/common';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { UserService } from '../user/user.service';
import { PostDietService } from 'src/post-diet/post-diet.service';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
    private readonly userService: UserService,
    private readonly postDietService: PostDietService,
  ) {}

  async findLikes(targetId) {
    // 좋아요가 눌려진 게시글 정보
    const post = await this.postDietService.findOne(targetId);

    const likes = await this.likesRepository.find({
      where: {
        postDiet: { id: post.id },
      },
    });

    return likes.length;
  }

  async update(updateLikeDto: UpdateLikeDto) {
    // 좋아요를 누른 사용자 정보
    const user = await this.userService.findOne(+updateLikeDto.userId);
    // 좋아요가 눌려진 게시글 정보
    const post = await this.postDietService.findOne(+updateLikeDto.targetId);

    const like = await this.likesRepository.findOne({
      where: {
        userId: user.id,
        postDiet: { id: post.id },
      },
    });

    if (like) {
      // 좋아요가 이미 존재하면 삭제
      await this.likesRepository.remove(like);
      return;
    } else {
      // 좋아요가 없으면 새로 생성
      const newLike = this.likesRepository.create({
        userId: updateLikeDto.userId,
        postDiet: post,
      });
      await this.likesRepository.save(newLike);
      return;
    }
  }
}
