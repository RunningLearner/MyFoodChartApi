import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Post } from './entities/post.entity';
import { Menu } from './entities/menu.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class BoardDietService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    this.logger.info(
      `diet post create service called createpostdto: ${JSON.stringify(
        createPostDto,
      )}`,
    );
    const { menues, ...data } = createPostDto;

    const newPost = this.postsRepository.create(data);

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
    });

    if (!foundPost) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }

    // 메뉴 분리
    const { menues, ...data } = updatePostDto;

    // Update the post data
    Object.assign(foundPost, data);

    const savedPost = await this.postsRepository.save(foundPost);

    if (menues && menues.length > 0) {
      // 연결된 모든 메뉴 제거
      const existingMenues = await this.menuRepository.find({
        where: { post: foundPost },
      });
      await this.menuRepository.remove(existingMenues);

      // 새로운 걸로 생성
      const newMenues = this.menuRepository.create(
        menues.map((menu) => ({ ...menu, post: savedPost })),
      );
      await this.menuRepository.save(newMenues);
    }

    if (savedPost) {
      this.logger.info(
        `diet update service succeed. res:${JSON.stringify(savedPost)}`,
      );
    }
    return savedPost;
  }

  async remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
