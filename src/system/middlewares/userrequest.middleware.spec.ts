import {
  Controller,
  Get,
  HttpStatus,
  INestApplication,
  MiddlewareConsumer,
  Module,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { UserRequestMiddleware } from './userrequest.middleware';

const RETURN_VALUE = 'test';

@Controller()
class TestController {
  @Get('test')
  test() {
    return RETURN_VALUE;
  }
}

@Module({
  imports: [],
  controllers: [TestController],
})
class TestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserRequestMiddleware).forRoutes('*');
  }
}

describe('Suite tests for UserRequestMiddleware', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = (
      await Test.createTestingModule({
        imports: [TestModule],
      }).compile()
    ).createNestApplication();

    await app.init();
  });

  it('must be OK for requests with userId', async () => {
    await request(app.getHttpServer())
      .get('/test')
      .set('userid', '0f14d0ab-9605-4a62-a9e4-5ed26688389b')
      .expect(HttpStatus.OK);
  });

  it('must be UNAUTHORIZED for requests with userId invalid', async () => {
    await request(app.getHttpServer())
      .get('/test')
      .set('userid', '0f14b-965-4a2-a94-5e389b')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('must be UNAUTHORIZED for requests without userId', async () => {
    await request(app.getHttpServer())
      .get('/test')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  afterEach(async () => {
    await app.close();
  });
});
