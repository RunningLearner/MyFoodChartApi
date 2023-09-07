import { Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GoogleRequest } from './auth.controller';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async OAuthLogin(req: GoogleRequest, @Res() res: Response) {
    const user = req.user; // Google에서 전달받은 사용자 정보

    // 1. 회원조회
    let user = await this.usersService.findOne({ email: req.user.email }); //user를 찾아서

    // 2, 회원가입이 안되어있다면? 자동회원가입
    if (!user) user = await this.usersService.create({ ...req.user }); //user가 없으면 하나 만들고, 있으면 이 if문에 들어오지 않을거기때문에 이러나 저러나 user는 존재하는게 됨.

    // 3. 회원가입이 되어있다면? 로그인(AT, RT를 생성해서 브라우저에 전송)한다

    // JWT 토큰 생성
    const payload = { username: user.firstName, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    res.cookie('access_token', accessToken); // 이제 .cookie 메서드를 사용할 수 있습니다.

    return res.json({
      message: 'Google 로그인 성공',
      user: req.user,
    });
  }
}
