import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BookModule } from './modules/book/book.module';
import { BookModel } from './models/book.model';
import { TenantIDMiddleware } from './common/middleware/tenantId.middleware';

const databaseOptions: TypeOrmModuleOptions = {
  name: 'default',
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: [BookModel],
  synchronize: true,
  logging: true,
  migrations: ['migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
};

@Module({
  imports: [TypeOrmModule.forRoot(databaseOptions), BookModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantIDMiddleware).forRoutes('*');
  }
}
