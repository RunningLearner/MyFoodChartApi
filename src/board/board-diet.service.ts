import { Inject, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class BoardDietService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    try {
      this.logger.info(`diet post create service called`);

      const newPost = this.boardsRepository.create(createBoardDto);

      return await this.boardsRepository.save(newPost);
    } catch (e) {
      this.logger.warn(
        `Diet 게시글 생성 실패 CreateBoardDto: ${createBoardDto} Error: ${e.message} Stack Trace: ${e.stack}`,
      );
    }
  }

  async findAll() {
    return `This action returns all board`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  async remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
