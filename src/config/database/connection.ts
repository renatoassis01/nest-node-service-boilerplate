import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Environment } from '../enviroment';

import * as dotenv from 'dotenv';
import { BookModel } from '../../models/book.model';
dotenv.config();

const migrations = {
  migrations: ['../database/migrations/*.ts'],
  cli: {
    migrationsDir: '../database/migrations',
  },
};

export function getDatabaseConfigConnection(): TypeOrmModuleOptions {
  return {
    name: 'default',
    type: 'postgres',
    host: Environment.getDatabaseConfig().host,
    username: Environment.getDatabaseConfig().username,
    password: Environment.getDatabaseConfig().password,
    database: Environment.getDatabaseConfig().database,
    logging: Environment.isEnvironmentDev(),
    entities: [BookModel],
    ...migrations,
  };
}

export function getDatabaseConfigConnectionTest(): TypeOrmModuleOptions {
  return {
    name: 'default',
    type: 'sqlite',
    database: ':memory:',
    migrationsRun: true,
    synchronize: true,
    entities: [BookModel],
    ...migrations,
  };
}
