import { Controller, Get, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { FakerUtils } from '../../utils/faker.utils';
import { TenantId } from './tenantId.decorator';

@Controller()
class TestController {
  @Get('test')
  test(@TenantId() tenantId: string) {
    return tenantId; //gambiarra
  }
}

describe('Suite tests for @TenantId() decorator', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = (
      await Test.createTestingModule({
        controllers: [TestController],
      }).compile()
    ).createNestApplication();

    await app.init();
  });

  it('must be return tenantId', async () => {
    const tenantId = FakerUtils.faker().random.uuid();
    const response = await request(app.getHttpServer())
      .get('/test')
      .set('tenantid', tenantId);

    expect(response.text).toEqual(tenantId);
  });

  it('must be return tenant_id snake_case', async () => {
    const tenantId = FakerUtils.faker().random.uuid();
    const response = await request(app.getHttpServer())
      .get('/test')
      .set('tenant_id', tenantId);

    expect(response.text).toEqual(tenantId);
  });

  afterEach(async () => {
    await app.close();
  });
});
