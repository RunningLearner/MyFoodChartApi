import {
  Controller,
  Get,
  Body,
  Patch,
  Req,
  UseGuards,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtGuard } from '../common/gurads/jwt.guard';
import { UserService } from '../user/user.service';
import { UpdateUserPhotoDTO } from '../user/dto/update-user-photo.dto';
import { FileInterceptor } from '../common/interceptors/file.interceptor';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('myposts')
  findMyDietPosts(@Req() req, @Query('type') type?: string) {
    const userEmail = req.user.email;
    return this.profileService.findMyPosts(userEmail, type);
  }

  @UseGuards(JwtGuard)
  @Get('mycomments')
  findMyComments(@Req() req, @Query('type') type?: string) {
    const userEmail = req.user.email;
    return this.profileService.findMyComments(userEmail, type);
  }

  @UseGuards(JwtGuard)
  @Get('mylikeposts')
  findMyLikePosts(@Req() req, @Query('type') type?: string) {
    const userEmail = req.user.email;
    return this.profileService.findMyLikePosts(userEmail, type);
  }

  @UseGuards(JwtGuard)
  @Get('mybookmarks')
  findMyBookMarks(@Req() req, @Query('type') type?: string) {
    const userEmail = req.user.email;
    return this.profileService.findMyBookMarks(userEmail, type);
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor)
  @Patch('updatephoto')
  updateMyPhoto(@Req() req, @Body() updateUserPhotoDto: UpdateUserPhotoDTO) {
    const userEmail = req.user.email;
    return this.userService.updatePhoto(userEmail, updateUserPhotoDto);
  }
}
