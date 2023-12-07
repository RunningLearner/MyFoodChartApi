import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';
import { CustomLoggerDecorator } from '../common/decorators/custom-logger.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtGuard } from '../common/gurads/jwt.guard';
import { RolesGuard } from '../common/gurads/roles.guard';
import { PostFreeService } from './post-free.service';
import { CreatePostFreeDto } from './dto/create-post-free.dto';
import { UpdatePostFreeDto } from './dto/update-post-free.dto';

@Controller('posts')
export class PostsController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    private readonly postFreeService: PostFreeService,
  ) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('user', 'admin')
  @Post('free')
  @CustomLoggerDecorator()
  create(@Body() creatPostDto: CreatePostFreeDto, @Request() req) {
    // 인증된 유저 메일을 추가
    creatPostDto.userEmail = req.user.email;

    return this.postFreeService.create(creatPostDto);
  }

  @Get('free')
  @CustomLoggerDecorator()
  findAll() {
    return this.postFreeService.findAll();
  }

  @Get('free/:id')
  @CustomLoggerDecorator()
  findOne(@Param('id') id: string) {
    return this.postFreeService.findOne(+id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('user', 'admin')
  @Patch('free/:id')
  @CustomLoggerDecorator()
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostFreeDto,
    @Request() req,
  ) {
    updatePostDto.userEmail = req.user.email;

    return this.postFreeService.update(+id, updatePostDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('user', 'admin')
  @Delete('free/:id')
  @CustomLoggerDecorator()
  remove(@Param('id') id: string, @Request() req) {
    return this.postFreeService.remove(+id, req.user.email);
  }
}
