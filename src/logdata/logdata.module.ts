import { Module } from '@nestjs/common';
import { LogdataController } from './logdata.controller';

@Module({
  controllers: [LogdataController],
})
export class LogdataModule {}
