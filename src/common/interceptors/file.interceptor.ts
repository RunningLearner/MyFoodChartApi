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
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        let folder = 'uploads/';
        if (file.fieldname === 'recipeImg') {
          folder += 'images/';
        } else if (file.fieldname === 'recipeFile') {
          folder += 'files/';
        }

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
      { name: 'recipeImg', maxCount: 1 },
      { name: 'recipeFile', maxCount: 1 },
    ]);

    await new Promise((resolve, reject) => {
      upload(request, null, (err) => {
        if (err) {
          reject(err);
        }

        if (request.files && request.files.recipeImg) {
          request.body.recipeImg = path.join(
            'uploads',
            'images',
            request.files.recipeImg[0].filename,
          );
        }

        if (request.files && request.files.recipeFile) {
          request.body.recipeFile = path.join(
            'uploads',
            'files',
            request.files.recipeFile[0].filename,
          );
        }
        resolve(true);
      });
    });

    return next.handle();
  }
}
