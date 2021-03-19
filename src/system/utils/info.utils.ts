import * as chalk from 'chalk';
import { EnvironmentEnum } from '../../common/enums/enviroment.enum';
import { EnvironmentConfig } from '../../config/enviroment.config';

const PORT = EnvironmentConfig.getServicePort();
export class InfoUtils {
  public static banner(apiPath: string): void {
    const display = chalk.cyanBright(`
      
    █▀█ █▀█ █▄▄ █ ▀█▀   ▀█▀ █▀▀ ▄▀█ █▀▄▀█ █▀
    █▄█ █▀▄ █▄█ █ ░█░   ░█░ ██▄ █▀█ █░▀░█ ▄█
       
       `);

    console.log(display);
    if (EnvironmentConfig.getCurrentEnvironment() === EnvironmentEnum.DEV) {
      console.log(
        `CURRENT ENVIRONMENT: ${chalk.green(
          EnvironmentConfig.getCurrentEnvironment(),
        )}`,
      );
      console.log(
        `API doc access the browser at: ${chalk.green(
          `http://localhost:${PORT}/${apiPath}`,
        )}`,
      );
      console.log(
        `API doc JSON access the browser at: ${chalk.green(
          `http://localhost:${PORT}/api-json`,
        )}`,
      );
      console.log(
        `Starting development server at: ${chalk.green(
          `http://localhost:${PORT}`,
        )} \n`,
      );
    }
  }
}
