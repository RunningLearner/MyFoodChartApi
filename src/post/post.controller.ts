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
import { PostServiceFactory } from './post-service.factory';
import { JwtGuard } from '../common/gurads/jwt.guard';
import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '../common/interceptors/file.interceptor';
import { UpdatePostDto } from './dto/update-post.dto';
import { CustomLoggerDecorator } from '../common/decorators/custom-logger.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/gurads/roles.guard';

@Controller('posts')
export class PostsController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    private readonly boardServiceFactory: PostServiceFactory,
  ) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('user', 'admin')
  @UseInterceptors(FileInterceptor)
  @Post(':type')
  @CustomLoggerDecorator()
  create(
    @Param('type') type: string,
    @Body() creatPostDto: CreatePostDto,
    @Request() req,
  ) {
    // 인증된 유저 메일을 추가
    creatPostDto.userEmail = req.user.email;

    const boardService = this.boardServiceFactory.getService(type);
    return boardService.create(creatPostDto);
  }

  @Get(':type')
  @CustomLoggerDecorator()
  findAll(@Param('type') type: string) {
    this.logger.info(`게시글 조회 컨르롤러 호출됨.`);
    const boardService = this.boardServiceFactory.getService(type);
    return boardService.findAll();
  }

  @Get(':type/:id')
  @CustomLoggerDecorator()
  findOne(@Param('type') type: string, @Param('id') id: string) {
    this.logger.info(`단일 게시글 조회 컨르롤러 호출됨. id: ${id}`);
    const boardService = this.boardServiceFactory.getService(type);
    return boardService.findOne(+id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('user', 'admin')
  @UseInterceptors(FileInterceptor)
  @Patch(':type/:id')
  @CustomLoggerDecorator()
  update(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req,
  ) {
    updatePostDto.email = req.user.email;

    const boardService = this.boardServiceFactory.getService(type);
    return boardService.update(+id, updatePostDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('user', 'admin')
  @Delete(':type/:id')
  @CustomLoggerDecorator()
  remove(@Param('type') type: string, @Param('id') id: string, @Request() req) {
    const boardService = this.boardServiceFactory.getService(type);
    return boardService.remove(+id, req.user.email);
  }
}
