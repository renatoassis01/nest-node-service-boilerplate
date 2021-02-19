import { Environment } from '../../../config/enviroment';

import * as chalk from 'chalk';

const PORT = Environment.getServicePort();
export class InfoUtils {
  public static banner(apiPath: string): void {
    const display = chalk.cyanBright(`
       █░█ ▀█▀ ▄▀█ ▀▄▀   ▀█▀ █▀▀ ▄▀█ █▀▄▀█
       ▀▀█ ░█░ █▀█ █░█   ░█░ ██▄ █▀█ █░▀░█
       
       `);

    console.log(display);
    if (Environment.getCurrentEnvironment() === 'DEV') {
      console.log(
        `CURRENT ENVIRONMENT: ${chalk.green(
          Environment.getCurrentEnvironment(),
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
        )}`,
      );
    }
  }
}
