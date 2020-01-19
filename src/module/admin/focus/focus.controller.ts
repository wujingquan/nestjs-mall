import { Controller, Get, Render, Post, UseInterceptors, Body, UploadedFile, Response, Query } from '@nestjs/common';
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

  @Get('edit')
  @Render('admin/focus/edit')
  async edit(@Query() query) {
    try {
      const resule = await this.focusService.find({ _id: query.id })
      return {
        focus: resule[0]
      }
    } catch (err) {
      console.log(err);
    }
  }

  @Post('doEdit')
  @UseInterceptors(FileInterceptor('focus_img'))
  async doEdit(@Body() body, @UploadedFile() file, @Response() res) {
    let _id = body._id;

    if (file) {
      let { saveDir } = this.toolsService.uploadFile(file);
      await this.focusService.update({
        "_id": _id
      }, Object.assign(body, {
        focus_img: saveDir
      }));
    } else {
      await this.focusService.update({
        "_id": _id
      }, body);
    }
  }

  @Get('add')
  @Render('admin/focus/add')
  async add() {
    return {}
  }

  @Post('doAdd')
  @UseInterceptors(FileInterceptor('focus_img'))
  async doAdd(@Body() body, @UploadedFile() file, @Response() res) {
    this.toolsService.uploadFile(file);
    let { saveDir } = this.toolsService.uploadFile(file);
    await this.focusService.add(Object.assign(body, {
      focus_img: saveDir
    }))
    this.toolsService.success(res, `/${Config.adminPath}/focus`);
  }

  @Get('delete')
  async delete(@Query() query, @Response() res) {
    var result = await this.focusService.delete({ "_id": query.id });
    this.toolsService.success(res, `/${Config.adminPath}/focus`);
  }
}
