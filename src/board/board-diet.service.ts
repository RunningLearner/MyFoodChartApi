import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Post } from './entities/post.entity';
import { Menu } from './entities/menu.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class BoardDietService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    this.logger.info(
      `diet post create service called createpostdto: ${JSON.stringify(
        createPostDto,
      )}`,
    );
    console.log(createPostDto.userEmail);
    const user = await this.usersRepository.findOne({
      where: { email: createPostDto.userEmail },
    });
    console.log(user);
    if (!user) {
      throw new NotFoundException(
        `이메일이 ${createPostDto.userEmail}인 사용자를 찾을 수 없습니다. `,
      );
    }

    const { menues, ...data } = createPostDto;

    const newPostData = { ...data, user };

    const newPost = this.postsRepository.create(newPostData);

    const savedPost = await this.postsRepository.save(newPost);

    if (menues && menues.length > 0) {
      const newMenues = this.menuRepository.create(
        menues.map((menu) => ({ ...menu, post: savedPost })),
      );

      await this.menuRepository.save(newMenues);
    }

    return savedPost;
  }

  async findAll() {
    this.logger.info(`diet post findAll service called`);
    return await this.postsRepository.find();
  }

  async findOne(id: number) {
    this.logger.info(`diet post findOne service called`);

    const foundPost = await this.postsRepository.findOne({
      where: { id },
    });

    if (!foundPost) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return foundPost;
  }

  async update(postId: number, updatePostDto: UpdatePostDto) {
    this.logger.info(
      `diet post update service called updatePostDto: ${JSON.stringify(
        updatePostDto,
      )}`,
    );

    const foundPost = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['user'],
    });

    if (!foundPost) {
      throw new NotFoundException(`PostID ${postId}를 찾을 수 없습니다.`);
    }

    if (foundPost.user.email != updatePostDto.email) {
      throw new ForbiddenException(`작성자가 아닙니다!`);
    }

    // 메뉴와 이메일 분리
    const { menues, email, ...data } = updatePostDto;

    // 객체를 덮어씌우기
    Object.assign(foundPost, data);

    const savedPost = await this.postsRepository.save(foundPost);

    if (menues && menues.length > 0) {
      // 연결된 모든 메뉴 제거
      const existingMenues = await this.menuRepository.find({
        where: { post: foundPost },
      });

      // 기존에 연결되어 있던 메뉴를 삭제
      await this.menuRepository.remove(existingMenues);

      // 받아온 메뉴로 새로 생성
      const newMenues = this.menuRepository.create(
        menues.map((menu) => ({ ...menu, post: savedPost })),
      );

      await this.menuRepository.save(newMenues);
    }

    if (savedPost) {
      this.logger.info(
        `post update service succeed. res:${JSON.stringify(savedPost)}`,
      );
    }

    return savedPost;
  }

  async remove(id: number) {
    this.logger.info(`diet post remove service called with Post ID: ${id}`);
    const foundPost = await this.postsRepository.findOne({
      where: { id },
    });

    if (!foundPost) {
      throw new NotFoundException(`게시글 ID ${id}을 찾을 수 없습니다.`);
    }

    await this.postsRepository.remove(foundPost);

    this.logger.info(`post remove service succeed with Post ID: ${id}`);

    return `게시글 ID ${id}가 삭제되었습니다.`;
  }
}
