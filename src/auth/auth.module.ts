import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'google' })],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtService],
})
export class AuthModule {}
