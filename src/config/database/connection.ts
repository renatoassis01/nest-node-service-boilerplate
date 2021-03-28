import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfig } from '../enviroment.config';

import * as dotenv from 'dotenv';
dotenv.config();

export const config: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: EnvironmentConfig.getDatabaseConfig().host,
  port: EnvironmentConfig.getDatabaseConfig().port,
  username: EnvironmentConfig.getDatabaseConfig().username,
  password: EnvironmentConfig.getDatabaseConfig().password,
  database: EnvironmentConfig.getDatabaseConfig().database,
  logging: EnvironmentConfig.isEnvironmentDev(),
};

export function getDatabaseConfigConnection(): TypeOrmModuleOptions {
  return {
    ...config,
    entities: ['dist/modules/**/models/*.model.{ts,js}'],
  };
}

export function getDatabaseConfigConnectionQA(): TypeOrmModuleOptions {
  return {
    ...config,
    migrationsRun: true,
    synchronize: true,
    logging: false,
  };
}
