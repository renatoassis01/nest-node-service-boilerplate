import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';
import { EnvironmentEnum } from '../../common/enums/enviroment.enum';

class EnviromentConfigValidatorDTO {
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
  const validatedConfig = plainToClass(EnviromentConfigValidatorDTO, config, {
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
