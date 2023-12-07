import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtGuard } from '../common/gurads/jwt.guard';
import { RolesGuard } from '../common/gurads/roles.guard';
import { CommentDietService } from './comment-diet.service';
import { CommentFreeService } from './comment-free.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDietDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentDietService: CommentDietService,
    private readonly commentFreeService: CommentFreeService,
  ) {}

  @Post(':type')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('user', 'admin')
  create(
    @Param('type') type: string,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req,
  ) {
    const service = this.getService(type);

    // 인증된 유저 메일을 추가
    createCommentDto.userEmail = req.user.email;
    createCommentDto.type = type;

    return service.create(createCommentDto);
  }

  @Get(':type')
  findAll(@Param('type') type: string) {
    const service = this.getService(type);

    return service.findAll();
  }

  @Get(':type/:id')
  findOne(@Param('type') type: string, @Param('id') id: string) {
    const service = this.getService(type);

    return service.findOne(+id);
  }

  @Patch(':type/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Param('type') type: string,
    @Body() updateCommentDto: UpdateCommentDietDto,
    @Req() req,
  ) {
    const service = this.getService(type);
    // 인증된 유저 메일을 추가
    updateCommentDto.userEmail = req.user.email;

    return service.update(+id, updateCommentDto);
  }

  @Delete(':type/:id')
  @UseGuards(JwtGuard)
  @Roles('admin')
  remove(@Param('type') type: string, @Param('id') id: string) {
    const service = this.getService(type);

    return service.remove(+id);
  }

  private getService(type: string) {
    return type === 'diet' ? this.commentDietService : this.commentFreeService;
  }
}
