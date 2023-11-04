import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      this.logger.warn('No token provided.');
      return false; // 토큰이 없는 경우 false를 반환
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!request.user) {
        request.user = {};
      }

      request.user.email = (decoded as jwt.JwtPayload).email;
      this.logger.info(`로그인 성공 유저: ${JSON.stringify(decoded)}`);
      return true;
    } catch (e) {
      this.logger.warn(
        `Invalid token received: ${token} Error: ${e.message} Stack Trace: ${e.stack}`,
      );
      // 토큰이 유효하지 않음
      throw e;
    }
  }
}
