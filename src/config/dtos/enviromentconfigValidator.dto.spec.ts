import 'reflect-metadata';
import { EnvironmentEnum } from '../../system/enums/enviroment.enum';
import { validate } from './enviromentconfigvalidator.dto';

describe('Suite tests for EnviromentConfigValidatorDTO', () => {
  it('should be not errors', () => {
    const config = {
      CURRENT_ENVIRONMENT: EnvironmentEnum.DEV,
      PORT: 3000,
      DB_PORT: 5432,
      DB_HOST: 'localhost',
      DB_USER: 'user',
      DB_PASSWORD: 'passwd',
      DB_NAME: 'database',
    };

    expect(() => {
      validate(config);
    }).not.toThrow();
  });
  it('should be errors [without property]', () => {
    const config = {
      CURRENT_ENVIRONMENT: EnvironmentEnum.DEV,
      DB_PORT: 5432,
      DB_HOST: 'localhost',
      DB_USER: 'user',
      DB_PASSWORD: 'passwd',
      DB_NAME: 'database',
    };

    expect(() => {
      validate(config);
    }).toThrow();
  });
});
