import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';

interface IOAuthUser {
  //interface 설정
  user: {
    name: string;
    email: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    // 프로필을 받아온 다음, 로그인 처리해야하는 곳(auth.service.ts에서 선언해준다)
    this.authService.OAuthLogin(req, res);
  }

  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  async naverLogin(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    // 프로필을 받아온 다음, 로그인 처리해야하는 곳(auth.service.ts에서 선언해준다)
    this.authService.OAuthLogin(req, res);
  }
}
