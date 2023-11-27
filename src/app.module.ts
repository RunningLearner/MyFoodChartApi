import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { LoggerModule } from './common/module/logger.module';
import { CommentModule } from './comment/comment.module';
import { RequestIdMiddleware } from './common/middlewares/request-id.middleware';
import { LogdataModule } from './logdata/logdata.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: 'root',
      password: '1234',
      database: 'mfc',
      autoLoadEntities: true,
      synchronize: false,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    LoggerModule,
    AuthModule,
    UserModule,
    PostModule,
    CommentModule,
    LogdataModule,
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
