import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { RequestIdMiddleware } from './common/middlewares/request-id.middleware';
import { LoggerModule } from './common/module/logger.module';
import { LogdataModule } from './logdata/logdata.module';
import { PostDietModule } from './post-diet/post-diet.module';
import { PostFreeModule } from './post-free/post-free.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LikeModule } from './like/like.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // 정적 파일들이 위치한 폴더
      serveRoot: '/uploads', // URL에서 사용될 경로
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: 'root',
      password: '1234',
      database: 'recipesoup',
      autoLoadEntities: true,
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    LoggerModule,
    AuthModule,
    UserModule,
    PostDietModule,
    PostFreeModule,
    CommentModule,
    LogdataModule,
    ProfileModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*'); // 모든 라우트에 적용
  }
}
