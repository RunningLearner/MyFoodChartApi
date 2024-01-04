import { Controller, Body, Patch } from '@nestjs/common';
import { LikeService } from './like.service';
import { UpdateLikeDto } from './dto/update-like.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Patch()
  updateLike(@Body() updateLikeDto: UpdateLikeDto) {
    return this.likeService.update(updateLikeDto);
  }
}
