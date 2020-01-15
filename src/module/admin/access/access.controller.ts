import { Controller, Get, Render, Query, Body, Post, Response } from '@nestjs/common';
import { Config } from 'src/config/index';
import { ToolsService } from '../../../services/tools/tools.service';
import { AccessService } from '../../../services/access/access.service';
import * as mongoose from 'mongoose';

@Controller(`${Config.adminPath}/access`)
export class AccessController {
  constructor(
    private readonly toolsService: ToolsService,
    private readonly accessService: AccessService,
  ) { }

  @Get()
  @Render('admin/access/index')
  async index() {
    const list = await this.accessService.getModel().aggregate([
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items'
        }
      },
      {
        $match: {
          'module_id': '0'
        }
      }
    ])

    return {
      list
    }
  }

  @Get('edit')
  @Render('admin/access/edit')
  async edit(@Query() query) {
    const result = await this.accessService.find({
      module_id: '0'
    })
    const accessResult = await this.accessService.find({ _id: query.id })
    return {
      list: accessResult[0],
      moduleList: result
    };
  }

  @Post('doEdit')
  async doEdit(@Body() body, @Response() res) {
    const {
      module_id,
      _id
    } = body

    try {
      if (module_id != 0) {
        body.module_id = mongoose.Types.ObjectId(module_id);
      }

      await this.accessService.update({
        _id
      }, body)
      this.toolsService.success(res, `/${Config.adminPath}/access`);
    } catch (err) {
      this.toolsService.error(res, '非法请求', `/${Config.adminPath}/access/edit?id=${_id}`);
    }
  }

  @Get('add')
  @Render('admin/access/add')
  async add() {
    const result = await this.accessService.find({ module_id: '0' })
    return {
      moduleList: result
    }
  }

  @Post('doAdd')
  async doAdd(@Body() body, @Response() res) {
    const {
      module_id
    } = body
    if (module_id != 0) {
      body.module_id = mongoose.Types.ObjectId(module_id);
    }

    await this.accessService.add(body)
    this.toolsService.success(res, `/${Config.adminPath}/access`);
  }
}
