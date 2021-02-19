import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Environment } from '../enviroment';

import * as dotenv from 'dotenv';
dotenv.config();

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: Environment.getDatabaseConfig().host,
  port: Environment.getDatabaseConfig().port,
  username: Environment.getDatabaseConfig().username,
  password: Environment.getDatabaseConfig().password,
  database: Environment.getDatabaseConfig().database,
  logging: Environment.isEnvironmentDev(),
};

export function getDatabaseConfigConnection(): TypeOrmModuleOptions {
  return {
    name: 'default',
    ...config,
    entities: ['dist/modules/**/models/*.model.{ts,js}'],
  };
}

export function getDatabaseConfigConnectionQA(): TypeOrmModuleOptions {
  return {
    name: 'default',
    type: 'sqlite',
    database: ':memory:',
    migrationsRun: true,
    synchronize: true,
  };
}
