import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { QueryFailedError } from 'typeorm/error/QueryFailedError';
import { Logger as WinstonLogger } from 'winston';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
  ) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      // HttpException 처리
      const status = exception.getStatus();
      this.logger.error(
        `HTTP 예외 발생: ${exception.message} ${exception.stack}`,
      );
      response.status(status).json({
        statusCode: status,
        message: exception.message,
      });
    } else if (exception instanceof QueryFailedError) {
      // QueryFailedError 처리
      this.logger.error(
        `데이터베이스 쿼리 실패: ${exception.message} ${exception.stack}`,
      );
      response.status(500).json({
        statusCode: 500,
        message: '데이터베이스 쿼리 중 오류가 발생했습니다.',
      });
    } else if (exception instanceof Error) {
      // 그 외 일반 예외 처리
      message = exception.message;
      this.logger.error(`일반 예외 발생: ${message} ${exception.stack}`);
      response.status(500).json({
        statusCode: 500,
        message: '서버에 오류가 발생했습니다.',
      });
    } else {
      // 알 수 없는 예외 유형 처리
      this.logger.error('알 수 없는 예외 발생', exception);
      response.status(500).json({
        statusCode: 500,
        message: '서버에 오류가 발생했습니다.',
      });
    }
  }
}
