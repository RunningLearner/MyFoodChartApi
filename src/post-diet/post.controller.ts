import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
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
import { DietReturnDto } from './dto/diet-return.dto';
import { LikeService } from '../like/like.service';

@Controller('posts')
export class PostsController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    private readonly postDietService: PostDietService,
    private readonly likeService: LikeService,
  ) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('user', 'admin')
  @UseInterceptors(FileInterceptor)
  @Post('diet')
  @CustomLoggerDecorator()
  create(@Body() creatPostDto: CreatePostDietDto, @Request() req) {
    // 인증된 유저 메일을 추가
    const userEmail = req.user.email;
    console.log(creatPostDto);
    return this.postDietService.create(userEmail, creatPostDto);
  }

  @Get('diet/search')
  search(
    @Query('institue') institue: string,
    @Query('keyword') keyword: string,
    // TODO : 정렬 구현 @Query('orderBy') orderBy: string,
  ) {
    return this.postDietService.search(institue, keyword);
  }

  @Get('diet')
  @CustomLoggerDecorator()
  async findAll() {
    const postList = await this.postDietService.findAll();
    const postsWithLikes = await Promise.all(
      postList.map(async (post) => {
        const likesCount = await this.likeService.findLikes(post.id);
        return { ...post, likes: likesCount };
      }),
    );

    return postsWithLikes;
  }

  @Get('diet/:id')
  @CustomLoggerDecorator()
  async findOne(@Param('id') id: string) {
    const post = await this.postDietService.findOne(+id);
    const likes = await this.likeService.findLikes(+id);
    return DietReturnDto.fromEntity(post, likes);
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
