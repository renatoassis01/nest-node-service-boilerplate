import 'reflect-metadata';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/utils/pipes/validator.pipe';
import { Environment } from './config/enviroment';
import { SwaggerUtils } from './modules/app/utils/swaggerCustom.utils';
import { InfoUtils } from './modules/app/utils/infoUtils';
const API_DOCS_PATH = 'api';
const PORT = Environment.getServicePort();

async function setupNestApplication(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  return app;
}

async function bootstrap(): Promise<void> {
  const app = await setupNestApplication();
  SwaggerUtils.setupSwaggerModule(app, API_DOCS_PATH);
  await app.listen(PORT);
  InfoUtils.banner(API_DOCS_PATH);
}
bootstrap();
