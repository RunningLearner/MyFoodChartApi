import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/common/gurads/jwt.guard';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('aboutme')
  findMe(@Request() req) {
    // 인증된 유저 메일을 추가
    const email = req.user.email;

    return this.userService.findMe(email);
  }

  @UseGuards(JwtGuard)
  @Patch('nickname')
  updateNickname(@Request() req, @Body() updateUserDto: UpdateUserDTO) {
    // 인증된 유저 메일을 추가
    const email = req.user.email;

    return this.userService.updateNickname(email, updateUserDto);
  }

  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
