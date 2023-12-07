import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { Logger as WinstonLogger } from 'winston';
import { CustomLoggerDecorator } from '../common/decorators/custom-logger.decorator';
import { User } from '../user/entities/user.entity';
import { PostFree } from './entities/post-free.entity';
import { CreatePostFreeDto } from './dto/create-post-free.dto';
import { UpdatePostFreeDto } from './dto/update-post-free.dto';

@Injectable()
export class PostFreeService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    @InjectRepository(PostFree)
    private postsFreeRepository: Repository<PostFree>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @CustomLoggerDecorator()
  async create(createPostDto: CreatePostFreeDto) {
    const user = await this.usersRepository.findOne({
      where: { email: createPostDto.userEmail },
    });

    if (!user) {
      throw new NotFoundException(
        `이메일이 ${createPostDto.userEmail}인 사용자를 찾을 수 없습니다. `,
      );
    }

    const newPost = this.postsFreeRepository.create(createPostDto);

    const savedPost = await this.postsFreeRepository.save(newPost);

    return savedPost;
  }

  @CustomLoggerDecorator()
  async findAll() {
    const result = await this.postsFreeRepository.find({
      relations: ['user'],
    });

    return result;
  }

  @CustomLoggerDecorator()
  async findOne(id: number) {
    const foundPost = await this.postsFreeRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!foundPost) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return foundPost;
  }

  @CustomLoggerDecorator()
  async update(postId: number, updatePostDto: UpdatePostFreeDto) {
    const foundPost = await this.postsFreeRepository.findOne({
      where: { id: postId },
      relations: ['user'],
    });

    if (!foundPost) {
      throw new NotFoundException(`PostID ${postId}를 찾을 수 없습니다.`);
    }

    const { userEmail, ...data } = updatePostDto;

    if (foundPost.user.email != userEmail) {
      throw new UnauthorizedException(`게시글을 수정할 권한이 없습니다.`);
    }

    // 객체를 덮어씌우기
    Object.assign(foundPost, data);

    const savedPost = await this.postsFreeRepository.save(foundPost);

    return savedPost;
  }

  @CustomLoggerDecorator()
  async remove(id: number, userEmail: string) {
    const foundPost = await this.postsFreeRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!foundPost) {
      throw new NotFoundException(`게시글 ID ${id}을 찾을 수 없습니다.`);
    }

    if (foundPost.user.email !== userEmail) {
      throw new UnauthorizedException(`게시글을 수정할 권한이 없습니다.`);
    }

    await this.postsFreeRepository.remove(foundPost);

    return `게시글 ID ${id}가 삭제되었습니다.`;
  }
}
