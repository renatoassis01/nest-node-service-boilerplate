import { Controller, Get, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { FakerUtils } from '../../utils/faker.utils';
import { UserId } from './userId.decorator';

@Controller()
class TestController {
  @Get('test')
  test(@UserId() userId: string) {
    return userId; //gambiarra
  }
}

describe('Suite tests for @UserId() decorator', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = (
      await Test.createTestingModule({
        controllers: [TestController],
      }).compile()
    ).createNestApplication();

    await app.init();
  });

  it('must be return userId', async () => {
    const userId = FakerUtils.faker().random.uuid();
    const response = await request(app.getHttpServer())
      .get('/test')
      .set('userid', userId);

    expect(response.text).toEqual(userId);
  });

  it('must be return user_id snake_case', async () => {
    const userId = FakerUtils.faker().random.uuid();
    const response = await request(app.getHttpServer())
      .get('/test')
      .set('user_id', userId);

    expect(response.text).toEqual(userId);
  });

  afterEach(async () => {
    await app.close();
  });
});
