import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostDiet } from '../post-diet/entities/post-diet.entity';
import { User } from '../user/entities/user.entity';
import { CommentReturnDto } from './dto/comment-return.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDietDto } from './dto/update-comment.dto';
import { CommentDiet } from './entities/comment-diet.entity';

@Injectable()
export class CommentDietService {
  constructor(
    @InjectRepository(CommentDiet)
    private commentDietRepository: Repository<CommentDiet>,
    @InjectRepository(PostDiet)
    private postDietRepository: Repository<PostDiet>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const newComment = new CommentDiet();
    newComment.content = createCommentDto.content;

    const foundUser = await this.userRepository.findOne({
      where: { email: createCommentDto.userEmail },
    });

    newComment.user = foundUser;

    const foundPost = await this.postDietRepository.findOne({
      where: { id: +createCommentDto.postId },
    });

    newComment.post = foundPost;

    await this.commentDietRepository.save(newComment);

    return newComment;
  }

  async findAll() {
    const foundComments = await this.commentDietRepository.find();
    return foundComments.map((foundComment) =>
      CommentReturnDto.fromEntity(foundComment),
    );
  }

  async findOne(id: number) {
    const foundComment = await this.commentDietRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!foundComment) {
      throw new NotFoundException(`Comment with ID ${id} not found.`);
    }

    return CommentReturnDto.fromEntity(foundComment);
  }

  async update(id: number, updateCommentDto: UpdateCommentDietDto) {
    const foundComment = await this.commentDietRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!foundComment) {
      throw new NotFoundException(`Comment with ID ${id} not found.`);
    }

    if (foundComment.user.email !== updateCommentDto.userEmail) {
      throw new UnauthorizedException('Unauthorized to edit this comment.');
    }

    foundComment.content = updateCommentDto.content;

    await this.commentDietRepository.save(foundComment);

    return foundComment;
  }

  async remove(id: number) {
    const foundComment = await this.commentDietRepository.findOne({
      where: { id },
    });

    if (!foundComment) {
      throw new NotFoundException(`Comment with ID ${id} not found.`);
    }

    await this.commentDietRepository.remove(foundComment);

    return `Comment with ID ${id} has been deleted.`;
  }
}
