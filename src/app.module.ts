import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BookModule } from './modules/book/book.module';
import { BookModel } from './models/book.model';
import { TenantIDMiddleware } from './common/middleware/tenantId.middleware';
import { RequestLoggerMiddleware } from './common/middleware/logger.middleware';
import { getDatabaseConfigConnection } from './config/database/connection';

const databaseOptions = {
  ...getDatabaseConfigConnection(),
  synchronize: true,
  logging: true,
};
@Module({
  imports: [TypeOrmModule.forRoot(databaseOptions), BookModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantIDMiddleware, RequestLoggerMiddleware).forRoutes('*');
  }
}
