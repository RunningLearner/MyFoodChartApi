import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { asyncLocalStorage } from './async-local-storage';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestId = uuidv4(); // 고유한 요청 ID 생성 및 할당
    asyncLocalStorage.run(new Map(), () => {
      const store = asyncLocalStorage.getStore() as Map<string, any>;
      store.set('requestId', requestId);
      next();
    });
  }
}
