import { EnvironmentEnum } from '../common/enums/enviroment.enum';

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

  public static isEnvironmentPrd(): boolean {
    return process.env.CURRENT_ENVIRONMENT === EnvironmentEnum.PRD;
  }

  public static getDatabaseConfig() {
    return {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };
  }

  public static getMongoConfig() {
    return {
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT, 10) || 27017,
      database: process.env.MONGO_DBNAME,
    };
  }
}
