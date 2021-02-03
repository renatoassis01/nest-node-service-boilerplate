import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/utils/pipes/validator.pipe';
import * as dotenv from 'dotenv';
import { Environment } from './config/enviroment';
dotenv.config();

const API_DOCS_PATH = 'api/docs';
const PORT = Environment.getServicePort();

function banner(): void {
  const display = `
  █░█ ▀█▀ ▄▀█ ▀▄▀   ▀█▀ █▀▀ ▄▀█ █▀▄▀█
  ▀▀█ ░█░ █▀█ █░█   ░█░ ██▄ █▀█ █░▀░█

  CURRENT ENVIRONMENT: ${Environment.getCurrentEnvironment()}
  PORT: ${PORT}`;
  console.log(display);
  if (Environment.getCurrentEnvironment() === 'DEV')
    console.log(`API DOCS: https://localhot:${PORT}/${API_DOCS_PATH}`);
}

async function setupNestApplication(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  return app;
}

function setupSwaggerModule(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Template Service')
    .setDescription('Template Service')
    .setVersion('1.0')
    .addTag('book')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(API_DOCS_PATH, app, document);
}

async function bootstrap(): Promise<void> {
  const app = await setupNestApplication();
  setupSwaggerModule(app);
  await app.listen(PORT);
  banner();
}
bootstrap();
