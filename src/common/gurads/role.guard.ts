import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRole } from '../../user/entities/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const isAdimin = user.role === UserRole.ADMIN;
    return user && isAdimin;
  }
}
