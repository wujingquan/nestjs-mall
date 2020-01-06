import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
import * as md5 from 'md5';

@Injectable()
export class ToolsService {
  getCaptcha() {
    const captcha = svgCaptcha.create({
      size: 5,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc9966',
    });
    return captcha;
  }

  getMd5(str: string): string {
    return md5(str);
  }

  async error(res, message, redirectUrl) {
    await res.render('admin/public/error', {
      message: message,
      redirectUrl: redirectUrl,
    });
  }
}
