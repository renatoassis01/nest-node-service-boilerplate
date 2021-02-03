import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as uuid from 'uuid-validate';

@Injectable()
export class TenantIDMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const tenantid = req.header('tenantid');
    if (!tenantid || !uuid(tenantid))
      throw new UnauthorizedException('tenantid invalid');

    next();
  }
}
