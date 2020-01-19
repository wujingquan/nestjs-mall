import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
import * as md5 from 'md5';
const mkdirp = require('mkdirp');
import { Config } from '../../config';
import { join, extname } from 'path'
import { createWriteStream } from 'fs'
const moment = require('moment');

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

  async success(res, redirectUrl) {
    await res.render('admin/public/success', {
      redirectUrl: redirectUrl,
    });
  }

  async error(res, message, redirectUrl) {
    await res.render('admin/public/error', {
      message: message,
      redirectUrl: redirectUrl,
    });
  }

  getTime() {
    let d = new Date();
    return d.getTime();
  }

  uploadFile(file) {
    console.log('debug')
    if (!file) {
      return {
        saveDir: '',
        uploadDir: ""
      };
    }

    const day = moment().format('YYYYMMDD');
    const d = this.getTime();
    const dir = join(__dirname, `../../../public/${Config.uploadDir}`, day);
    mkdirp.sync(dir);
    let uploadDir = join(dir, d + extname(file.originalname));

    const writeImage = createWriteStream(uploadDir);
    writeImage.write(file.buffer);

    let saveDir = join(Config.uploadDir, day, d + extname(file.originalname));

    return {
      saveDir,
      uploadDir
    };
  }
}
