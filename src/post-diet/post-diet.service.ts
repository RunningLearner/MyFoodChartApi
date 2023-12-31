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
import { CreatePostDietDto } from './dto/create-post-diet.dto';
import { DietReturnAllDto, DietReturnDto } from './dto/diet-return.dto';
import { UpdatePostDietDto } from './dto/update-post-diet.dto';
import { Menu } from './entities/menu.entity';
import { PostDiet } from './entities/post-diet.entity';

@Injectable()
export class PostDietService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    @InjectRepository(PostDiet)
    private postsDietRepository: Repository<PostDiet>,
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @CustomLoggerDecorator()
  async search(institute: string, keyword: string) {
    const result = await this.postsDietRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.menues', 'menu')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.institute = :institute', { institute })
      .andWhere('menu.menuName LIKE :keyword', { keyword: `%${keyword}%` })
      .getMany();

    return result.map((post) => DietReturnAllDto.fromEntity(post));
  }

  @CustomLoggerDecorator()
  async create(userEmail: string, createPostDto: CreatePostDietDto) {
    const user = await this.usersRepository.findOne({
      where: { email: userEmail },
    });

    if (!user) {
      throw new NotFoundException(
        `이메일이 ${userEmail}인 사용자를 찾을 수 없습니다. `,
      );
    }

    const { menues, ...data } = createPostDto;

    const newPostData = { ...data, user };

    const newPost = this.postsDietRepository.create(newPostData);

    const savedPost = await this.postsDietRepository.save(newPost);

    if (menues && menues.length > 0) {
      const newMenues = this.menuRepository.create(
        menues.map((menu) => ({ ...menu, post: savedPost })),
      );

      await this.menuRepository.save(newMenues);
    }

    return savedPost;
  }

  @CustomLoggerDecorator()
  async findAll(): Promise<DietReturnAllDto[]> {
    const result = await this.postsDietRepository.find({
      relations: ['user', 'menues'],
    });

    return result.map((post) => DietReturnAllDto.fromEntity(post));
  }

  @CustomLoggerDecorator()
  async findOne(id: number): Promise<DietReturnDto> {
    const foundPost = await this.postsDietRepository.findOne({
      where: { id },
      relations: ['user', 'menues', 'comments', 'comments.user'],
    });

    if (!foundPost) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return DietReturnDto.fromEntity(foundPost);
  }

  @CustomLoggerDecorator()
  async update(postId: number, updatePostDto: UpdatePostDietDto) {
    const foundPost = await this.postsDietRepository.findOne({
      where: { id: postId },
      relations: ['user'],
    });

    if (!foundPost) {
      throw new NotFoundException(`PostID ${postId}를 찾을 수 없습니다.`);
    }

    // 메뉴와 이메일 분리
    const { menues, email, ...data } = updatePostDto;

    if (foundPost.user.email != email) {
      throw new UnauthorizedException(`게시글을 수정할 권한이 없습니다.`);
    }

    // 객체를 덮어씌우기
    Object.keys(data).forEach((key) => {
      if (data[key] !== 'null' && data[key] !== '') {
        foundPost[key] = data[key];
      }
    });

    const savedPost = await this.postsDietRepository.save(foundPost);

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

    return savedPost;
  }

  @CustomLoggerDecorator()
  async remove(id: number, userEmail: string) {
    const foundPost = await this.postsDietRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!foundPost) {
      throw new NotFoundException(`게시글 ID ${id}을 찾을 수 없습니다.`);
    }

    if (foundPost.user.email !== userEmail) {
      throw new UnauthorizedException(`게시글을 수정할 권한이 없습니다.`);
    }

    await this.postsDietRepository.remove(foundPost);

    return `게시글 ID ${id}가 삭제되었습니다.`;
  }
}
