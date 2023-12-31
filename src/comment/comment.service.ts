import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostDiet } from '../post-diet/entities/post-diet.entity';
import { User, UserRole } from '../user/entities/user.entity';
import { CommentReturnDto } from './dto/comment-return.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { PostFree } from '../post-free/entities/post-free.entity';

@Injectable()
export class CommentDietService {
  constructor(
    @InjectRepository(Comment)
    private commentDietRepository: Repository<Comment>,
    @InjectRepository(PostDiet)
    private postDietRepository: Repository<PostDiet>,
    @InjectRepository(PostDiet)
    private postFreeRepository: Repository<PostFree>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createCommentDto: CreateCommentDto, userEmail: string) {
    const newComment = new Comment();
    newComment.content = createCommentDto.content;
    newComment.type = createCommentDto.type;

    const foundUser = await this.userRepository.findOne({
      where: { email: userEmail },
    });

    newComment.user = foundUser;

    let foundPost;

    if (createCommentDto.type === 'diet') {
      foundPost = await this.postDietRepository.findOne({
        where: { id: +createCommentDto.postId },
      });
      newComment.postDiet = foundPost;
    } else {
      foundPost = await this.postFreeRepository.findOne({
        where: { id: +createCommentDto.postId },
      });
      newComment.postFree = foundPost;
    }

    await this.commentDietRepository.save(newComment);

    return newComment;
  }

  async findAll(type: string) {
    const foundComments = await this.commentDietRepository.find({
      where: { type },
    });
    return foundComments.map((foundComment) =>
      CommentReturnDto.fromEntity(foundComment),
    );
  }

  async findOne(type: string, id: number) {
    const foundComment = await this.commentDietRepository.findOne({
      where: { type, id },
      relations: ['user'],
    });

    if (!foundComment) {
      throw new NotFoundException(`Comment with ID ${id} not found.`);
    }

    return CommentReturnDto.fromEntity(foundComment);
  }

  async update(type: string, id: number, updateCommentDto: UpdateCommentDto) {
    const foundComment = await this.commentDietRepository.findOne({
      where: { type, id },
      relations: ['user'],
    });

    if (!foundComment) {
      throw new NotFoundException(`해당 댓글을 찾을 수 없습니다.`);
    }

    if (updateCommentDto.userRole !== UserRole.ADMIN) {
      throw new UnauthorizedException('Unauthorized to edit this comment.');
    }

    foundComment.content = updateCommentDto.content;

    await this.commentDietRepository.save(foundComment);

    return foundComment;
  }

  async remove(type: string, id: number) {
    const foundComment = await this.commentDietRepository.findOne({
      where: { type, id },
    });

    if (!foundComment) {
      throw new NotFoundException(`Comment with ID ${id} not found.`);
    }

    await this.commentDietRepository.remove(foundComment);

    return `Comment with ID ${id} has been deleted.`;
  }
}
