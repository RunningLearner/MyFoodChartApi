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
import { RolesGuard } from 'src/common/gurads/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('user', 'admin')
  @Get('aboutme')
  findMe(@Request() req) {
    // 인증된 유저 메일을 추가
    const email = req.user.email;

    return this.userService.findMe(email);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('user', 'admin')
  @Patch(':id')
  update(@Request() req, @Body() updateUserDto: UpdateUserDTO) {
    // 인증된 유저 메일을 추가
    const email = req.user.email;

    return this.userService.update(email, updateUserDto);
  }

  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles('user', 'admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
