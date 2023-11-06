import { Global, Module } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as winston from 'winston';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: WINSTON_MODULE_PROVIDER,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return winston.createLogger({
          level: configService.get<string>('LOG_LEVEL', 'info'),
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
          transports: [
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
              ),
            }),
            new winston.transports.File({
              filename: 'application.log',
            }),
          ],
        });
      },
    },
  ],
  exports: [WINSTON_MODULE_PROVIDER],
})
export class LoggerModule {}
