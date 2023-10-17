import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as fs from 'fs';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let fakeToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('게시글 생성', () => {
    // 여기에는 실제 파일의 경로를 넣어주세요.
    const filePath = path.resolve(__dirname, './test-assets/testImage.jpeg');
    // 테스트 유저 인증
    const user = { id: 1, username: 'test' };
    fakeToken = jwt.sign(user, process.env.JWT_SECRET);
    console.log(fakeToken);

    return request(app.getHttpServer())
      .post('/boards/diet')
      .set('authorization', `Bearer ${fakeToken}`)
      .attach('file', fs.readFileSync(filePath), 'testImage.jpeg')
      .expect(201)
      .then((response) => {
        // 여기에 성공시 응답을 확인하는 로직을 넣을 수 있습니다.
        expect(response.body).toBeDefined();
      });
  });
});
