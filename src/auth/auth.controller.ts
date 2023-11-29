import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { NaverAuthGuard } from './gurads/naver-auth.guard';
import { KakaoAuthGuard } from './gurads/kakao-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(NaverAuthGuard) // 여기에서 'naver'는 NaverStrategy의 이름과 일치해야 합니다.
  @Get('login/naver')
  async naverLogin() {
    // 함수 본문은 실행되지 않습니다. Guard에 의해 Naver 로그인 페이지로 리다이렉트됩니다.
  }

  @UseGuards(NaverAuthGuard)
  @Get('login/naver/callback')
  async naverLoginCallback(@Req() req, @Res() res) {
    // 사용자 정보는 req.user에 저장됩니다.
    // 로그인 처리를 여기에서 합니다.
    console.log('naverlogincallback called!');
    const accessToken = await this.authService.OAuthLogin(req);
    // cookie 메서드를 사용할 수 있습니다.
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
    });

    res.redirect(`${process.env.FRONT_HOST}/home`);
  }

  @UseGuards(KakaoAuthGuard) // 여기에서 'naver'는 NaverStrategy의 이름과 일치해야 합니다.
  @Get('login/kakao')
  async kakaoLogin() {
    // 함수 본문은 실행되지 않습니다. Guard에 의해 Naver 로그인 페이지로 리다이렉트됩니다.
  }

  @UseGuards(KakaoAuthGuard)
  @Get('login/kakao/callback')
  async kakaoLoginCallback(@Req() req, @Res() res) {
    // 사용자 정보는 req.user에 저장됩니다.
    // 로그인 처리를 여기에서 합니다.
    console.log('kakaologincallback called!');
    const accessToken = await this.authService.OAuthLogin(req);
    // cookie 메서드를 사용할 수 있습니다.
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
    });

    res.redirect(`${process.env.FRONT_HOST}/home`);
  }

  @Get('logout')
  async logout(@Res() res) {
    res.clearCookie('access_token'); // JWT 쿠키 제거
    res.status(HttpStatus.OK).json({ isLogIn: false });
  }
}
