import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { FileInterceptor } from './file.interceptor';
import { of } from 'rxjs';
import * as path from 'path';
import * as fs from 'fs';

describe('FileInterceptor', () => {
  let interceptor: FileInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileInterceptor],
    }).compile();

    interceptor = module.get<FileInterceptor>(FileInterceptor);
  });

  it('should handle file upload and attach URLs', async () => {
    // 1. 테스트용 요청 객체 생성
    const mockReq = {
      files: {
        imgfile: [
          { originalname: 'testImage.jpeg', filename: 'testImage_saved.jpeg' },
        ],
      },
      body: { imgfileUrl: '' },
    };

    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockReq,
      }),
    } as unknown as ExecutionContext;

    const mockCallHandler = {
      handle: () => of('test'),
    } as unknown as CallHandler;

    // 2. 인터셉터 실행
    await new Promise<void>(async (resolve) => {
      (
        await interceptor.intercept(mockExecutionContext, mockCallHandler)
      ).subscribe({
        complete: () => resolve(),
      });
    });

    // 3. 결과 검증
    expect(mockReq.body.imgfileUrl).toBeDefined();
    const filePath = path.resolve(__dirname, '..', mockReq.body.imgfileUrl);
    expect(fs.existsSync(filePath)).toBe(true);

    // 테스트가 끝나면 파일을 삭제
    // if (fs.existsSync(filePath)) {
    //   fs.unlinkSync(filePath);
    // }
  });
});
