import * as path from 'path';
import { config } from './config/database/connection';

module.exports = {
  ...config,
  entities: [path.join(__dirname, 'modules/**/models/*.model{.ts,.js}')],
  migrations: [path.join(__dirname, 'config/database/migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/config/database/migrations',
  },
};
