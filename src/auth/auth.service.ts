import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { FindOneOptions } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async OAuthLogin(req, res) {
    //const userInfo = req.user; // Google에서 전달받은 사용자 정보
    const email = req.user.email;
    const options: FindOneOptions<User> = {
      where: { email },
    };

    // 1. 회원조회
    let user = await this.userService.findOne(options); //user를 찾아서
    let accessToken: string;

    // 2, 회원가입이 안되어있다면?
    if (!user) {
      //user가 없으면 하나 만들고, 있으면 이 if문에 들어오지 않을거기때문에 이러나 저러나 user는 존재하는게 됨.
      user = await this.userService.create({ ...req.user });
      console.log('new user!!', user);
    }
    // 3. 회원가입이 되어있다면? 로그인(AT, RT를 생성해서 브라우저에 전송)한다
    // JWT 토큰 생성
    else {
      const payload = { username: user.name, email: user.email };
      accessToken = this.jwtService.sign(payload);
    }

    res.cookie('access_token', accessToken); // 이제 .cookie 메서드를 사용할 수 있습니다.
  }
}
