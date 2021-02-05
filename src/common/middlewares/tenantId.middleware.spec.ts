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
import { TenantIDMiddleware } from './tenantId.middleware';

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
    consumer.apply(TenantIDMiddleware).forRoutes('*');
  }
}

describe('Suite tests for TenantIDMiddleware', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = (
      await Test.createTestingModule({
        imports: [TestModule],
      }).compile()
    ).createNestApplication();

    await app.init();
  });

  it('must be OK for requests with tenantid', async () => {
    await request(app.getHttpServer())
      .get('/test')
      .set('tenantid', '0f14d0ab-9605-4a62-a9e4-5ed26688389b')
      .expect(HttpStatus.OK);
  });

  it('must be UNAUTHORIZED for requests with tenantid invalid', async () => {
    await request(app.getHttpServer())
      .get('/test')
      .set('tenantid', '0f14b-965-4a2-a94-5e389b')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('must be UNAUTHORIZED for requests without tenantid', async () => {
    await request(app.getHttpServer())
      .get('/test')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  afterEach(async () => {
    await app.close();
  });
});
