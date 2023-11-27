import { Controller, Get, Res } from '@nestjs/common';
import * as archiver from 'archiver';
import { Response } from 'express';
import * as path from 'path';

@Controller('logdata')
export class LogdataController {
  @Get('download')
  async downloadLogs(@Res() response: Response) {
    const logsFolderPath = path.join(__dirname, '../../');
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    response.attachment('logs.zip');

    archive.pipe(response);
    archive.directory(logsFolderPath, false);
    archive.finalize();
  }
}
