import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
  ) {}

  async addLike(
    userId: number,
    targetId: number,
    targetType: string,
  ): Promise<Like> {
    const like = this.likesRepository.create({ userId, targetId, targetType });
    return this.likesRepository.save(like);
  }

  async findLikes(targetId, targetType) {
    const likes = await this.likesRepository.find({
      where: {
        targetId: targetId,
        targetType: targetType,
      },
    });

    return likes.length;
  }

  async update(updateLikeDto: UpdateLikeDto) {
    const like = await this.likesRepository.findOne({
      where: {
        userId: updateLikeDto.userId,
        targetId: updateLikeDto.targetId,
        targetType: updateLikeDto.targetType,
      },
    });

    if (like) {
      // 좋아요가 이미 존재하면 삭제
      await this.likesRepository.remove(like);
      return;
    } else {
      // 좋아요가 없으면 새로 생성
      const newLike = this.likesRepository.create(updateLikeDto);
      await this.likesRepository.save(newLike);
      return;
    }
  }
}
