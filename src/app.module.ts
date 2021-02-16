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

const databaseOptions = {
  ...getDatabaseConfigConnection(),
  synchronize: true,
};
@Module({
  imports: [TypeOrmModule.forRoot(databaseOptions), BookModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware, RequestLoggerMiddleware)
      .exclude({ path: '/api-json', method: RequestMethod.GET })
      .forRoutes('*');
  }
}
