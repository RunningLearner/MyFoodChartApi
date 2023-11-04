import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Inject,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { BoardServiceFactory } from './ board-service.factory';
import { JwtGuard } from '../common/gurads/jwt.guard';
import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '../common/interceptors/file.interceptor';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('boards')
export class BoardController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    private readonly boardServiceFactory: BoardServiceFactory,
  ) {}

  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor)
  @Post('/:type')
  create(
    @Param('type') type: string,
    @Body() creatPostDto: CreatePostDto,
    @Request() req,
  ) {
    this.logger.info(
      `게시글 생성 컨르롤러 호출됨. creatPostDto: ${JSON.stringify(
        creatPostDto,
      )}`,
    );

    // 인증된 유저 메일을 추가
    creatPostDto.userEmail = req.user.email;

    const boardService = this.boardServiceFactory.getService(type);
    return boardService.create(creatPostDto);
  }

  @Get('/:type')
  findAll(@Param('type') type: string) {
    this.logger.info(`게시글 조회 컨르롤러 호출됨.`);
    const boardService = this.boardServiceFactory.getService(type);
    return boardService.findAll();
  }

  @Get('/:type/:id')
  findOne(@Param('type') type: string, @Param('id') id: string) {
    this.logger.info(`단일 게시글 조회 컨르롤러 호출됨. id: ${id}`);
    const boardService = this.boardServiceFactory.getService(type);
    return boardService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor)
  @Patch('/:type/:id')
  update(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req,
  ) {
    this.logger.info(
      `게시글 수정 컨르롤러 호출됨. udatePostDto: ${JSON.stringify(
        updatePostDto,
      )}`,
    );

    updatePostDto.userEmail = req.user.email;

    const boardService = this.boardServiceFactory.getService(type);
    return boardService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('type') type: string, @Param('id') id: string) {
    const boardService = this.boardServiceFactory.getService(type);
    return boardService.remove(+id);
  }
}
