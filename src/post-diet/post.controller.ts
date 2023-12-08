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
  UseInterceptors,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';
import { CustomLoggerDecorator } from '../common/decorators/custom-logger.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtGuard } from '../common/gurads/jwt.guard';
import { RolesGuard } from '../common/gurads/roles.guard';
import { FileInterceptor } from '../common/interceptors/file.interceptor';
import { CreatePostDietDto } from './dto/create-post-diet.dto';
import { UpdatePostDietDto } from './dto/update-post-diet.dto';
import { PostDietService } from './post-diet.service';

@Controller('posts')
export class PostsController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    private readonly postDietService: PostDietService,
  ) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('user', 'admin')
  @UseInterceptors(FileInterceptor)
  @Post('diet')
  @CustomLoggerDecorator()
  create(@Body() creatPostDto: CreatePostDietDto, @Request() req) {
    // 인증된 유저 메일을 추가
    creatPostDto.userEmail = req.user.email;

    return this.postDietService.create(creatPostDto);
  }

  @Get('diet')
  @CustomLoggerDecorator()
  findAll() {
    return this.postDietService.findAll();
  }

  @Get('diet/:id')
  @CustomLoggerDecorator()
  findOne(@Param('id') id: string) {
    return this.postDietService.findOne(+id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('user', 'admin')
  @UseInterceptors(FileInterceptor)
  @Patch('diet/:id')
  @CustomLoggerDecorator()
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDietDto,
    @Request() req,
  ) {
    updatePostDto.email = req.user.email;

    return this.postDietService.update(+id, updatePostDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('user', 'admin')
  @Delete('diet/:id')
  @CustomLoggerDecorator()
  remove(@Param('id') id: string, @Request() req) {
    return this.postDietService.remove(+id, req.user.email);
  }
}
