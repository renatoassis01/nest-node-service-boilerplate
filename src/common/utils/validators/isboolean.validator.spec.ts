import { ValidationPipe } from '@nestjs/common';
import {
  Controller,
  Get,
  HttpStatus,
  INestApplication,
  Module,
  Query,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Transform } from 'class-transformer';
import * as request from 'supertest';
import { TransformUtils } from '../transform.utils';
import { IsBoolean } from './isboolean.validator';

const RETURN_VALUE = 'test';

class MyDTO {
  @Transform((value) => TransformUtils.ToBoolean(value))
  @IsBoolean()
  withDeleted: boolean;
}

@Controller()
class TestController {
  @Get('test')
  test(@Query() dto: MyDTO) {
    return RETURN_VALUE;
  }
}

@Module({
  imports: [],
  controllers: [TestController],
})
class TestModule {}

describe('Suite tests for @IsBoolean() for @Query()', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('must be OK for requests value valid', async () => {
    await request(app.getHttpServer())
      .get('/test?withDeleted=true')
      .expect(HttpStatus.OK);
  });

  it('must be BAD REQUEST for requests value not valid', async () => {
    await request(app.getHttpServer())
      .get('/test?withDeleted=7777')
      .expect(HttpStatus.BAD_REQUEST);
  });
  afterEach(async () => {
    await app.close();
  });
});
