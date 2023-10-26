import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as fs from 'fs';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const user = { email: 'test@test.com' };
  const fakeToken: string = jwt.sign(user, process.env.JWT_SECRET);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('게시글 생성', () => {
    const filePath1 = path.resolve(__dirname, './test-assets/testImage.jpeg');
    const filePath2 = path.resolve(__dirname, './test-assets/testFile.pdf');

    const menues = [
      {
        id: 0,
        menuName: 'Test Menu',
        isProductUsed: true,
        productName: 'Test Product',
        productBrand: 'Test Brand',
      },
      // ... other menu items
    ];

    return request(app.getHttpServer())
      .post('/boards/diet')
      .set('authorization', `Bearer ${fakeToken}`)
      .field('date', '2021-12-12') // 별도의 필드로 추가
      .field('institute', 'Test Institute')
      .field('peopleNum', '5')
      .field('price', '10000')
      .field('explanation', 'This is a test')
      .field('whichSchool', 'Test School')
      .field('menues', JSON.stringify(menues))
      .attach('recipeImg', fs.readFileSync(filePath1), 'testImage.jpeg')
      .attach('recipeFile', fs.readFileSync(filePath2), 'testFile.pdf')
      .expect(201)
      .then((response) => {
        expect(response.body).toBeDefined();
        // 여기에 추가적으로 응답 데이터에 대한 검증 로직을 넣을 수 있습니다.
      });
  });

  it('게시글 업데이트', () => {
    const updateData = {
      date: '2021-12-13',
      institute: 'Updated Institute',
      peopleNum: '6',
      price: '12000',
      explanation: 'This is an updated test',
      whichSchool: 'Updated School',
      menues: [
        {
          id: 1, // Assuming this menu item exists
          menuName: 'Updated Menu',
          isProductUsed: false,
          productName: 'Updated Product',
          productBrand: 'Updated Brand',
        },
        // ... other updated menu items
      ],
    };

    // Assuming the post to be updated has ID 1
    const postId = 59;

    return request(app.getHttpServer())
      .patch(`/boards/diet/${postId}`) // Assuming the update endpoint is PATCH /boards/diet/:id
      .set('authorization', `Bearer ${fakeToken}`)
      .field('date', '2021-12-13')
      .field('institute', updateData.institute)
      .field('peopleNum', updateData.peopleNum)
      .field('price', updateData.price)
      .field('explanation', updateData.explanation)
      .field('whichSchool', updateData.whichSchool)
      .field('menues', JSON.stringify(updateData.menues))
      .expect(200) // Assuming a 200 OK response is expected
      .then((response) => {
        expect(response.body).toBeDefined();
        // Additional assertions to verify the updated data
        expect(response.body.date).toEqual(updateData.date);
        expect(response.body.institute).toEqual(updateData.institute);
        // ... other assertions
      });
  });
});
