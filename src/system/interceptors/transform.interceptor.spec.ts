import { Controller, Get, INestApplication } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { IGetByFiltersResult } from '../../common/interfaces/getbyfiltersresult';
import { TransformInterceptor } from './transform.interceptor';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const objectWithPagination: IGetByFiltersResult = {
  count: 1,
  page: 1,
  limit: 20,
  totalPages: 2,
  data: [
    {
      name: 'todo',
      done: true,
    },
  ],
};

const objectWithPaginationDelay: Observable<IGetByFiltersResult> = of(
  objectWithPagination,
).pipe(delay(1000));

@Controller()
class HelloController {
  @Get('hello')
  test() {
    return 'Hello world!';
  }

  @Get('hello/get-by-filters')
  getByFilters() {
    return objectWithPagination;
  }

  @Get('hello/async')
  async getByFiltersAsync(): Promise<IGetByFiltersResult> {
    return objectWithPaginationDelay.toPromise();
  }

  @Get('hello/empty')
  empty() {
    return {};
  }

  @Get('hello/empty2')
  empty2() {
    return null;
  }
}

describe('Suite tests for TransformInterceptor', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = (
      await Test.createTestingModule({
        controllers: [HelloController],
        providers: [
          {
            provide: APP_INTERCEPTOR,
            useValue: new TransformInterceptor(),
          },
        ],
      }).compile()
    ).createNestApplication();

    await app.init();
  });

  it(`should map response CASE 1`, async () => {
    return request(app.getHttpServer())
      .get('/hello')
      .expect(200, { data: 'Hello world!' });
  });

  it(`should map response CASE 2`, async () => {
    await request(app.getHttpServer())
      .get('/hello/get-by-filters')
      .expect(200, objectWithPagination);
  });

  it(`should map response async CASE 3`, async () => {
    request(app.getHttpServer())
      .get('/hello/async')
      .expect(200, objectWithPagination);
  });

  it(`should not map response CASE 1`, async () => {
    return request(app.getHttpServer()).get('/hello/empty2').expect(200, '');
  });

  it(`should not map response CASE 2`, async () => {
    return request(app.getHttpServer())
      .get('/hello/empty')
      .expect(200, { data: {} });
  });

  afterEach(async () => {
    await app.close();
  });
});
