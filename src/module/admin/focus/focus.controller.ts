import { Controller, Get, Render, Post, UseInterceptors, Body, UploadedFile, Response } from '@nestjs/common';
import { Config } from '../../../config/index';

import { FocusService } from '../../../services/focus/focus.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ToolsService } from '../../../services/tools/tools.service';

@Controller(`${Config.adminPath}/focus`)
export class FocusController {
  constructor(
    private readonly focusService: FocusService,
    private readonly toolsService: ToolsService
  ) { }

  @Get()
  @Render('admin/focus/index')
  async index() {
    const result = await this.focusService.find();
    return {
      focusList: result
    }
    return {}
  }

  @Get('add')
  @Render('admin/focus/add')
  async add() {
    return {}
  }

  @Post('doAdd')
  @UseInterceptors(FileInterceptor('focus_img'))
  async doAdd(@Body() body, @UploadedFile() file, @Response() res) {
    this.toolsService.upLoadFile(file);
    let { saveDir } = this.toolsService.upLoadFile(file);
    await this.focusService.add(Object.assign(body, {
      focus_img: saveDir
    }))
    this.toolsService.success(res, `/${Config.adminPath}/focus`);
  }
}
