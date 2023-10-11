import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        let folder = 'uploads/';
        if (file.fieldname === 'imgfile') {
          folder += 'images/';
        } else if (file.fieldname === 'dietfile') {
          folder += 'diets/';
        }

        // 디렉터리가 없으면 만듭니다.
        if (!fs.existsSync(folder)) {
          fs.mkdirSync(folder, { recursive: true });
        }

        cb(null, folder);
      },
      filename: (req, file, cb) => {
        const fileName =
          path.parse(file.originalname).name.replace(/\s/g, '') +
          Date.now() +
          path.extname(file.originalname);
        cb(null, fileName);
      },
    });

    const upload = multer({ storage }).fields([
      { name: 'imgfile', maxCount: 1 },
      { name: 'dietfile', maxCount: 1 },
    ]);

    upload(request, null, (err) => {
      if (err) {
        // 에러 처리 로직
      } else {
        if (request.files.imgfile) {
          request.body.imgfileUrl = path.join(
            'uploads',
            'images',
            request.files.imgfile[0].filename,
          );
        }
        if (request.files.dietfile) {
          request.body.dietfileUrl = path.join(
            'uploads',
            'diets',
            request.files.dietfile[0].filename,
          );
        }
      }
    });

    return next.handle();
  }
}
