import { ValidationPipe } from '@nestjs/common';

export default new ValidationPipe({
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
  whitelist: true,
  validateCustomDecorators: true,
  forbidNonWhitelisted: true,
  forbidUnknownValues: true,
});
