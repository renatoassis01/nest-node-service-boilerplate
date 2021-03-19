import 'reflect-metadata';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentConfig } from './config/enviroment.config';
import { SwaggerUtils } from './system/utils/swagger.utils';
import { TransformInterceptor } from './system/interceptors/transform.interceptor';
import { InfoUtils } from './system/utils/info.utils';
import { NestExpressApplication } from '@nestjs/platform-express';
//import { PostgresExecptionFilter } from './system/execeptions/postgresfilter.exeception';
const ROOT_API_PATH = 'api';
const PORT = EnvironmentConfig.getServicePort();

async function setupNestApplication(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //app.useGlobalFilters(new PostgresExecptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.disable('x-powered-by');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      validateCustomDecorators: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
  app.setGlobalPrefix(ROOT_API_PATH);
  return app;
}

async function bootstrap(): Promise<void> {
  const app = await setupNestApplication();
  SwaggerUtils.setupSwaggerModule({
    app,
    apiPath: ROOT_API_PATH,
    title: 'Template microservice',
    description: 'Template microservice',
    version: '1.0',
    tag: {
      name: 'book',
    },
  });
  await app.listen(PORT);
  InfoUtils.banner(ROOT_API_PATH);
}
bootstrap();
