import { Controller, Body, Patch, UseGuards, Request } from '@nestjs/common';
import { LikeService } from './like.service';
import { UpdateLikeDto } from './dto/update-like.dto';
import { JwtGuard } from 'src/common/gurads/jwt.guard';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtGuard)
  @Patch()
  updateLike(@Body() updateLikeDto: UpdateLikeDto, @Request() req) {
    updateLikeDto.userId = +req.user.userId;

    return this.likeService.update(updateLikeDto);
  }
}
