import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha'

@Injectable()
export class ToolsService {
  getCaptcha() {
    const captcha = svgCaptcha.create({
      size: 2,
      fontSize: 50,
      width: 100,
      height: 34,
      background: "#cc9966"
    })
    return captcha;
  }

  async error(res, message, redirectUrl) {
    await res.render('admin/public/error', {
      message: message,
      redirectUrl: redirectUrl
    })
  }
}
