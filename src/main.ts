import 'reflect-metadata';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './system/pipes/validator.pipe';
import { EnvironmentConfig } from './config/enviroment.config';
import { SwaggerUtils } from './config/utils/swagger.utils';
import { InfoUtils } from './config/utils/info.utils';
const ROOT_API_PATH = 'api';
const PORT = EnvironmentConfig.getServicePort();

async function setupNestApplication(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(ROOT_API_PATH);
  return app;
}

async function bootstrap(): Promise<void> {
  const app = await setupNestApplication();
  SwaggerUtils.setupSwaggerModule(app, ROOT_API_PATH);
  await app.listen(PORT);
  InfoUtils.banner(ROOT_API_PATH);
}
bootstrap();
