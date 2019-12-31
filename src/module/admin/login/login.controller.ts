import { Controller, Get, Render, Request, Response, Post, Body } from '@nestjs/common';
import { ToolsService } from 'src/services/tools/tools.service';
import { Config } from 'src/config/index';


@Controller(`${Config.adminPath}/login`)
export class LoginController {
  constructor(private readonly toolsService: ToolsService) { }

  @Get()
  @Render('admin/login')
  index() {
    return {};
  }

  @Get('code')
  getCode(@Request() req, @Response() res) {
    const svgCaptcha = this.toolsService.getCaptcha()
    // console.log(svgCaptcha.data)

    // return svgCaptcha.data;
    console.log(svgCaptcha.text)
    req.session.code = svgCaptcha.text;
    res.type('image/svg+xml')
    res.send(svgCaptcha.data)
  }

  @Post('doLogin')
  async doLogin(@Body() body, @Request() req,@Response() res) {
    try {
      console.log(body)
      const {
        code,
        username,
        password
      } = body;

      if (!username.length || password.length < 6) {
        this.toolsService.error(res, '用户名或者密码不合法', `/${Config.adminPath}/login`)
      } else {
        console.log('before', req.session)
        if (code.toUpperCase() === req.session.code.toUpperCase()) {
          console.log('code', req.session.code)
        } else {
          this.toolsService.error(res, '验证码不正确', `/${Config.adminPath}/login`)
        }
      }
    } catch(error) {
      console.log(error);
      this.toolsService.error(res, '未知错误', `/${Config.adminPath}/login`)
    }
  }
}
