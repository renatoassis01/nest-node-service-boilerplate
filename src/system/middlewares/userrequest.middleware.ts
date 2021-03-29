import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as uuid from 'uuid-validate';

@Injectable()
export class UserRequestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userId = req.header('userid') || req.header('user_id');
    if (!userId || !uuid(userId))
      throw new UnauthorizedException(
        'Validation failed (userId  is expected)',
      );

    next();
  }
}
