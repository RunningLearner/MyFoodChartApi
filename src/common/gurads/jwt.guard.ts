import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { Logger as WinstonLogger } from 'winston';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookies = request.headers['cookie'];
    const token = this.extractTokenFromCookies(cookies, 'access_token');

    if (!token) {
      throw new UnauthorizedException('토큰이 존재하지 않습니다.');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userEmail = (decoded as jwt.JwtPayload).email;

      // 사용자 repo를 통해 사용자 정보를 가져옴
      const user = await this.usersRepository.findOne({
        where: { email: userEmail },
      });

      if (!user) {
        throw new NotFoundException(`${userEmail} 사용자를 찾을 수 없습니다.`);
      }

      if (!request.user) request.user = {};
      request.user.email = user.email;
      request.user.role = user.role;

      return true;
    } catch (e) {
      this.logger.warn(
        `Invalid token received: ${token} Error: ${e.message} Stack Trace: ${e.stack}`,
      );
      // 토큰이 유효하지 않음
      throw e;
    }
  }

  private extractTokenFromCookies(
    cookies: string,
    tokenKey: string,
  ): string | null {
    if (!cookies) return null;

    const keyValuePairs = cookies.split(';').map((cookie) => cookie.trim());

    const tokenCookie = keyValuePairs.find((cookie) =>
      cookie.startsWith(`${tokenKey}=`),
    );

    return tokenCookie ? tokenCookie.split('=')[1] : null;
  }
}
