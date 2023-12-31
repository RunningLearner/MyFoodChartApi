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
import { CommentDietService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentDietService: CommentDietService) {}

  @Post(':type')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('user', 'admin')
  create(
    @Param('type') type: string,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req,
  ) {
    // 인증된 유저 메일을 추가
    const userEmail = req.user.email;
    createCommentDto.type = type;

    return this.commentDietService.create(createCommentDto, userEmail);
  }

  @Get(':type')
  findAll(@Param('type') type: string) {
    return this.commentDietService.findAll(type);
  }

  @Get(':type/:id')
  findOne(@Param('type') type: string, @Param('id') id: string) {
    return this.commentDietService.findOne(type, +id);
  }

  @Patch(':type/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Param('type') type: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req,
  ) {
    // 인증된 유저 메일을 추가
    updateCommentDto.userRole = req.user.role;

    return this.commentDietService.update(type, +id, updateCommentDto);
  }

  @Delete(':type/:id')
  @UseGuards(JwtGuard)
  @Roles('admin')
  remove(@Param('type') type: string, @Param('id') id: string) {
    return this.commentDietService.remove(type, +id);
  }
}
