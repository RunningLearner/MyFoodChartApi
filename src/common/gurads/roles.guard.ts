import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 가드에 주입받은 Reflector를 이용하여 메타데이터 리스트를 얻는다.
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return matchRoles(roles, user.role);
  }
}

function matchRoles(roles: string[], userRole: any): boolean {
  if (roles.includes(userRole)) {
    return true;
  }

  throw new UnauthorizedException('사용자에게 권한이 없습니다.');
}
