import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
      scope: ['account_email', 'profile_nickname'],
    });
  }

  // validate 매서드는 리다이렉션된 후에 작동
  async validate(accessToken: string, refreshToken: string, profile, done) {
    console.log(profile);
    console.log(accessToken);
    let email;
    if (profile.emails && profile.emails.length > 0) {
      email = profile.emails[0].value;
    }

    // 사용자 정보는 profile 변수에 들어있습니다.
    // 필요한 로직을 여기에 구현하고, 사용자 정보를 반환하거나 에러를 던집니다.
    const user = {
      email: email,
    };
    return done(null, user);
  }
}
