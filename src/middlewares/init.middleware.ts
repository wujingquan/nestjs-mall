import { Injectable, NestMiddleware } from '@nestjs/common';
import { Config } from '../config/index';

@Injectable()
export class InitMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.locals.config = Config;
    next();
  }
}
