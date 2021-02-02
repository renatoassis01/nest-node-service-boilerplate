import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { isUUID } from '../utils/string.utils';

@Injectable()
export class TenantIDMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const tenantid = req.header('tenantid');
    if (!tenantid || !isUUID(tenantid))
      throw new UnauthorizedException('tenantid invalid');

    next();
  }
}
