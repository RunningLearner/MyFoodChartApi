import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PostDietService } from './post-diet.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';

@Injectable()
export class PostServiceFactory {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    // private readonly boardAService: BoardAService,
    // private readonly boardBService: BoardBService,
    private readonly postDietService: PostDietService,
  ) {}

  getService(type: string) {
    try {
      if (type === 'diet') {
        return this.postDietService;
      }
      // else if (type === 'A') {
      //   return this.boardAService;
      // } else if (type === 'B') {
      //   return this.boardBService;
      // }
      else {
        throw new NotFoundException('Invalid board type');
      }
    } catch (e) {
      this.logger.warn(
        `잘못된 게시판 유형: ${type} Error: ${e.message} Stack Trace: ${e.stack}`,
      );
    }
  }
}
