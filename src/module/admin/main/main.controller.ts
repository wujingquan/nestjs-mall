import { Controller, Get, Render } from '@nestjs/common';
import { Config } from '../../../config/index';

@Controller(`${Config.adminPath}/main`)
export class MainController {
  @Get()
  @Render('admin/main/index')
  index() {
    return {};
  }

  @Get('welcome')
  @Render('admin/main/welcome')
  welcome() {
    return {};
  }
}
