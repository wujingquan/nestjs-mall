import { Injectable, NestMiddleware } from '@nestjs/common';
import { AdminService } from '../services/admin/admin.service';
import { Config } from '../config';

@Injectable()
export class AdminauthMiddleware implements NestMiddleware {
  constructor(private readonly adminService: AdminService) {}
  async use(req: any, res: any, next: () => void) {
    const pathname = req.baseUrl,
      userinfo = req.session && req.session.userinfo;
    const whiteList = [
      `/${Config.adminPath}/login`,
      `/${Config.adminPath}/login/code`,
      `/${Config.adminPath}/login/doLogin`,
    ];

    if (whiteList.includes(pathname)) {
      next();
      return;
    }

    if (!userinfo || !userinfo.username) {
      res.redirect(`/${Config.adminPath}/login`);
      return;
    }

    const hasAuth = await this.adminService.checkAuth(req);
    if (!hasAuth) {
      res.send('您没有权限访问当前地址');
      return;
    }

    res.locals.userinfo = userinfo;
    next();
  }
}
