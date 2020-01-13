import {
  Controller,
  Get,
  Render,
  Request,
  Response,
  Post,
  Body,
} from '@nestjs/common';
import { ToolsService } from 'src/services/tools/tools.service';
import { AdminService } from '../../../services/admin/admin.service';

import { Config } from 'src/config/index';

@Controller(`${Config.adminPath}/login`)
export class LoginController {
  constructor(
    private readonly toolsService: ToolsService,
    private readonly adminService: AdminService,
  ) {}

  @Get()
  @Render('admin/login')
  index() {
    return {};
  }

  @Get('code')
  getCode(@Request() req, @Response() res) {
    const svgCaptcha = this.toolsService.getCaptcha();
    // console.log(svgCaptcha.data)

    // return svgCaptcha.data;
    console.log(svgCaptcha.text);
    req.session.code = svgCaptcha.text;
    res.type('image/svg+xml');
    res.send(svgCaptcha.data);
  }

  @Post('doLogin')
  async doLogin(@Body() body, @Request() req, @Response() res) {
    const { code, username, password } = body;

    if (!code.length) {
      this.toolsService.error(
        res,
        '验证码不正确',
        `/${Config.adminPath}/login`,
      );
      return;
    }

    if (
      code.length !== 5 ||
      code.toUpperCase() !== req.session.code.toUpperCase()
    ) {
      this.toolsService.error(
        res,
        '验证码不正确',
        `/${Config.adminPath}/login`,
      );
      return;
    }

    if (!username.length || username < 2) {
      this.toolsService.error(
        res,
        '用户名或者密码不合法',
        `/${Config.adminPath}/login`,
      );
      return;
    }

    const result = await this.adminService.findOne({
      username,
      password: this.toolsService.getMd5(password),
    });

    if (!result) {
      this.toolsService.error(
        res,
        '用户名或者密码不合法',
        `/${Config.adminPath}/login`,
      );
      return;
    }

    req.session.userinfo = result;
    this.toolsService.success(res, `/${Config.adminPath}/main`);
  }

  @Get('loginOut')
  loginOut(@Request() req, @Response() res) {
    req.session.userinfo = null;
    res.redirect(`${Config.adminPath}/login`);
  }
}
