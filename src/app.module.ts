import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './modules/book/book.module';
import { TenantMiddleware } from './common/middlewares/tenant.middleware';
import { RequestLoggerMiddleware } from './common/middlewares/logger.middleware';
import { getDatabaseConfigConnection } from './config/database/connection';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/enviroment';
import { UserRequestMiddleware } from './common/middlewares/userrequest.middleware';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './modules/app/controllers/helth.controller';

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
