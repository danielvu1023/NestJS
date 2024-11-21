import { INestApplication } from '@nestjs/common';
import { CatsModule } from '../src/cats/cats.module';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });
describe('Cats', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [CatsModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET orders`, async () => {
    const response = await request(app.getHttpServer())
      .get('/cats/order/1236')
      .expect(200);

    console.log(response.body); // Add logging to see the response

    expect(response.body).toEqual({ id: 1236, status: 7 });
  });
  afterAll(async () => {
    await app.close();
  });
});
