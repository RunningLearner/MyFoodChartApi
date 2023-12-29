import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentDiet } from '../comment/entities/comment-diet.entity';
import { CommentFree } from '../comment/entities/comment-free.entity';
import { PostDiet } from '../post-diet/entities/post-diet.entity';
import { PostFree } from '../post-free/entities/post-free.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from 'src/user/dto/update-user.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(PostDiet)
    private postDietRepository: Repository<PostDiet>,
    @InjectRepository(PostFree)
    private postFreeRepository: Repository<PostFree>,
    @InjectRepository(CommentDiet)
    private commentDietRepository: Repository<CommentDiet>,
    @InjectRepository(CommentFree)
    private commentFreeRepository: Repository<CommentFree>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findMyPosts(userEmail: string, type: string) {
    // 타입이 'free'인 경우
    if (type === 'free') {
      return await this.postFreeRepository.find({
        where: { user: { email: userEmail } },
        order: { createdAt: 'DESC' }, // 작성일 내림차순 정렬
      });
    }

    // 타입이 'diet'인 경우
    if (type === 'diet') {
      return await this.postDietRepository.find({
        where: { user: { email: userEmail } },
        relations: ['menues'],
        order: { createdAt: 'DESC' }, // 작성일 내림차순 정렬
      });
    }

    // 타입이 제공되지 않은 경우 (모든 게시글 반환)
    const postsFree = await this.postFreeRepository.find({
      where: { user: { email: userEmail } },
    });
    const postsDiet = await this.postDietRepository.find({
      where: { user: { email: userEmail } },
      relations: ['menues'],
    });

    // 모든 게시글을 하나의 배열로 결합하고, 작성일에 따라 정렬
    const allPosts = [...postsFree, ...postsDiet];
    allPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return allPosts;
  }

  async findMyComments(userEmail: string, type: string) {
    // 타입이 'free'인 경우
    if (type === 'free') {
      return await this.commentFreeRepository.find({
        where: { user: { email: userEmail } },
        order: { createdAt: 'DESC' }, // 작성일 내림차순 정렬
      });
    }

    // 타입이 'diet'인 경우
    if (type === 'diet') {
      return await this.commentDietRepository.find({
        where: { user: { email: userEmail } },
        order: { createdAt: 'DESC' }, // 작성일 내림차순 정렬
      });
    }

    // 타입이 제공되지 않은 경우 (모든 댓글 반환)
    const commentsFree = await this.commentFreeRepository.find({
      where: { user: { email: userEmail } },
    });
    const commentsDiet = await this.commentDietRepository.find({
      where: { user: { email: userEmail } },
    });

    // 모든 게시글을 하나의 배열로 결합하고, 작성일에 따라 정렬
    const allcomments = [...commentsFree, ...commentsDiet];
    allcomments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return allcomments;
  }

  async findMyLikePosts(userEmail: string, type: string) {
    // 타입이 'free'인 경우
    if (type === 'free') {
      return await this.postFreeRepository.find({
        where: { user: { email: userEmail } },
        order: { createdAt: 'DESC' }, // 작성일 내림차순 정렬
      });
    }

    // 타입이 'diet'인 경우
    if (type === 'diet') {
      return await this.postDietRepository.find({
        where: { user: { email: userEmail } /* like: {userEmail} */ },
        order: { createdAt: 'DESC' }, // 작성일 내림차순 정렬
      });
    }

    // 타입이 제공되지 않은 경우 (모든 게시글 반환)
    const postsFree = await this.postFreeRepository.find({
      where: { user: { email: userEmail } },
    });
    const postsDiet = await this.postDietRepository.find({
      where: { user: { email: userEmail } },
    });

    // 모든 게시글을 하나의 배열로 결합하고, 작성일에 따라 정렬
    const allPosts = [...postsFree, ...postsDiet];
    allPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return allPosts;
  }

  async findMyBookMarks(userEmail: string, type: string) {
    return await this.postDietRepository.find({
      where: { user: { email: userEmail } },
    });
  }
}
