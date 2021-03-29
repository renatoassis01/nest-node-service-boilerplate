import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as uuid from 'uuid-validate';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const tenantid = req.header('tenantid') || req.header('tenant_id');
    if (!tenantid || !uuid(tenantid))
      throw new UnauthorizedException(
        'Validation failed (tenantid  is expected)',
      );

    next();
  }
}
