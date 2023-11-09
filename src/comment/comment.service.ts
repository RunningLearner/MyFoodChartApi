import { Inject, Injectable } from '@nestjs/common';
import { CreateCommentDietDto } from './dto/create-comment.dto';
import { UpdateCommentDietDto } from './dto/update-comment.dto';
import { CommentDiet } from './entities/comment-diet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';
import { PostDiet } from '../post/entities/post-diet.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    @InjectRepository(CommentDiet)
    private commentsDietRepository: Repository<CommentDiet>,
    @InjectRepository(PostDiet)
    private postsRepository: Repository<PostDiet>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createCommentDto: CreateCommentDietDto) {
    const newComment = new CommentDiet();
    newComment.content = createCommentDto.content;
    const foundUser = await this.usersRepository.findOne({
      where: { email: createCommentDto.userEmail },
    });

    newComment.user = foundUser;

    const foundPost = await this.postsRepository.findOne({
      where: { user: foundUser },
    });

    newComment.post = foundPost;

    // 데이터베이스에 저장
    await this.commentsDietRepository.save(newComment);

    return newComment;
  }

  async findAll() {
    const foundComments = await this.commentsDietRepository.find();
    return foundComments;
  }

  async findOne(id: number) {
    const foundComment = await this.commentsDietRepository.findOne({
      where: { id },
    });
    return foundComment;
  }

  update(id: number, updateCommentDto: UpdateCommentDietDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: number) {
    const foundComment = await this.commentsDietRepository.findOne({
      where: { id },
    });

    this.commentsDietRepository.remove(foundComment);

    return `댓글 ID ${id}가 삭제되었습니다.`;
  }
}
