import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { BookModule } from './book/book.module';
import { BookModel } from './models/book.model';

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
export class AppModule {}
