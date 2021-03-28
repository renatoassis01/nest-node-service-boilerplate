import { EnvironmentEnum } from '../system/enums/enviroment.enum';
import { IDatabaseConfig } from './interfaces/database.config';

export class EnvironmentConfig {
  public static getServicePort(): number {
    return parseInt(process.env.PORT, 10);
  }

  public static getCurrentEnvironment(): string {
    return process.env.CURRENT_ENVIRONMENT || EnvironmentEnum.DEV;
  }

  public static isEnvironmentDev(): boolean {
    return process.env.CURRENT_ENVIRONMENT === EnvironmentEnum.DEV;
  }

  public static isEnvironmentQA(): boolean {
    return process.env.CURRENT_ENVIRONMENT === EnvironmentEnum.QA;
  }

  public static isEnvironmentPrd(): boolean {
    return process.env.CURRENT_ENVIRONMENT === EnvironmentEnum.PRD;
  }

  public static getDatabaseConfig(): IDatabaseConfig {
    return {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };
  }
}
