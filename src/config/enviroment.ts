import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';
import { EnvironmentEnum } from '../common/enums/enviroment.enum';

export class Environment {
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

class EnvironmentVariables {
  @IsEnum(EnvironmentEnum)
  CURRENT_ENVIRONMENT: EnvironmentEnum;

  @IsNumber()
  PORT: number;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
