import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
/* Google Strategy */
type GoogleUser = {
  email: string;
  nickname: string;
};
export type GoogleRequest = Request & { user: GoogleUser };

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(@Req() req: GoogleRequest, @Res() res: Response) {
    this.authService.OAuthLogin(req, res);
    // Google 로그인 페이지로 리다이렉트 됩니다.
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req) {
    // 구글 로그인 성공 후 실행되는 코드
    return {
      message: 'Google 로그인 성공하여 정보를 반환합니다.',
      user: req.user,
    };
  }
}
