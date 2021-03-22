import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './modules/book/book.module';
import { TenantMiddleware } from './system/middlewares/tenant.middleware';
import { RequestLoggerMiddleware } from './system/middlewares/logger.middleware';
import { getDatabaseConfigConnection } from './config/database/connection';
import { ConfigModule } from '@nestjs/config';
import { UserRequestMiddleware } from './system/middlewares/userrequest.middleware';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './helth.controller';
import { validate } from './config/dtos/enviromentconfigvalidator.dto';

const databaseOptions = {
  ...getDatabaseConfigConnection(),
};
@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot({
      validate,
    }),
    TypeOrmModule.forRoot(databaseOptions),
    BookModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware, UserRequestMiddleware, RequestLoggerMiddleware)
      .exclude(
        { path: '/api-json', method: RequestMethod.GET },
        { path: 'api/health', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
