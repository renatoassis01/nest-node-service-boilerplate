import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'path';
import { BookModel } from 'src/models/book.model';
import { Environment } from '../enviroment';

import * as dotenv from 'dotenv';
dotenv.config();

const migrations = {
  migrations: ['database/migrations/*.ts'],
  cli: {
    migrationsDir: 'database/migrations',
  },
};

export function getDatabaseConfigConnection(): TypeOrmModuleOptions {
  if (Environment.getCurrentEnvironment() === 'TEST') {
    return {
      name: 'default',
      type: 'sqlite',
      database: ':memory:',
      migrationsRun: true,
      synchronize: true,
      entities: [`${path.resolve(__dirname, '../models')}/*.{ts,js}`],
      ...migrations,
    };
  }

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
