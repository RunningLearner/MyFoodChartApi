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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDietDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':type')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('user', 'admin')
  create(
    @Param('type') type: string,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req,
  ) {
    // 인증된 유저 메일을 추가
    createCommentDto.userEmail = req.user.email;
    createCommentDto.type = type;

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

  @Patch(':type/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
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
  @UseGuards(JwtGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
