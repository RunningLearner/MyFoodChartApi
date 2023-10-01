import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NaverAuthGuard } from './gurads/naver-auth.guard';
import { KakaoAuthGuard } from './gurads/kakao-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login/naver')
  @UseGuards(NaverAuthGuard) // 여기에서 'naver'는 NaverStrategy의 이름과 일치해야 합니다.
  async naverLogin() {
    // 함수 본문은 실행되지 않습니다. Guard에 의해 Naver 로그인 페이지로 리다이렉트됩니다.
  }

  @Get('login/naver/callback')
  @UseGuards(NaverAuthGuard)
  async naverLoginCallback(@Req() req, @Res() res) {
    // 사용자 정보는 req.user에 저장됩니다.
    // 로그인 처리를 여기에서 합니다.
    console.log('naverlogincallback called!');
    this.authService.OAuthLogin(req, res);
    res.redirect('http://localhost:3000/');
  }

  @Get('login/kakao')
  @UseGuards(KakaoAuthGuard) // 여기에서 'naver'는 NaverStrategy의 이름과 일치해야 합니다.
  async kakaoLogin() {
    // 함수 본문은 실행되지 않습니다. Guard에 의해 Naver 로그인 페이지로 리다이렉트됩니다.
  }

  @Get('login/kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoLoginCallback(@Req() req, @Res() res) {
    // 사용자 정보는 req.user에 저장됩니다.
    // 로그인 처리를 여기에서 합니다.
    console.log('kakaologincallback called!');
    this.authService.OAuthLogin(req, res);
    res.redirect('http://localhost:3000/');
  }
}
