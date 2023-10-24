import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Post } from './entities/post.entity';
import { Menu } from './entities/menu.entity';
import { CreateMenuDTO } from './dto/create-menu.dto';

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
    // menues 필드를 배열로 변환
    // const parsedMenues: CreateMenuDTO[] = JSON.parse(menues);
    console.log(data);
    console.log(menues);
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
    return `This action returns all board`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  // async update(id: number, updateBoardDto: UpdateBoardDto) {
  //   return `This action updates a #${id} board`;
  // }

  async remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
