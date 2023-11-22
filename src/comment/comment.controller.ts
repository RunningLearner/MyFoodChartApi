import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDietDto } from './dto/create-comment.dto';
import { UpdateCommentDietDto } from './dto/update-comment.dto';
import { JwtGuard } from '../common/gurads/jwt.guard';
import { AdminGuard } from '../common/gurads/role.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtGuard)
  @Post(':type')
  create(@Body() createCommentDto: CreateCommentDietDto, @Req() req) {
    // 인증된 유저 메일을 추가
    createCommentDto.userEmail = req.user.email;

    return this.commentService.create(createCommentDto);
  }

  @Get(':type')
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':type/:id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':type/:id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDietDto,
    @Req() req,
  ) {
    // 인증된 유저 메일을 추가
    updateCommentDto.userEmail = req.user.email;

    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':type/:id')
  @UseGuards(JwtGuard, AdminGuard)
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
