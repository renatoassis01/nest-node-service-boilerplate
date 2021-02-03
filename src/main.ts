import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/utils/pipes/validator.pipe';

function banner(): void {
  const display = `
  █░█ ▀█▀ ▄▀█ ▀▄▀   ▀█▀ █▀▀ ▄▀█ █▀▄▀█
  ▀▀█ ░█░ █▀█ █░█   ░█░ ██▄ █▀█ █░▀░█

  CURRENT ENVIRONMENT: ${process.env.CURRENT_ENVIRONMENT || 'DEV'}
  PORT: ${process.env.PORT || 3000}`;
  console.log(display);
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
  SwaggerModule.setup('api/docs', app, document);
}

async function bootstrap(): Promise<void> {
  const app = await setupNestApplication();
  setupSwaggerModule(app);
  await app.listen(process.env.PORT || 3000);
  banner();
}
bootstrap();
