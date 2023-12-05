import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async OAuthLogin(req) {
    //const userInfo = req.user; // 소셜로그인을 통해 전달받은 사용자 정보
    const email = req.user.email;

    // 1. 회원조회
    let user = await this.userService.findOne(email); //user를 찾아서

    // 2, 회원가입이 안되어있다면?
    if (!user) {
      //user가 없으면 하나 만들고, 있으면 이 if문에 들어오지 않을거기때문에 이러나 저러나 user는 존재하는게 됨.
      user = await this.userService.create({ ...req.user });
    }

    // 3. 회원가입이 되었다면? 로그인(AT를 생성해서 브라우저에 전송)한다
    // JWT 토큰 생성
    const payload = { username: user.name, email: user.email };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1d', // 토큰 유효기간 하루 설정
    });

    return accessToken;
  }
}
