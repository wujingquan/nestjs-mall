import { Controller, Get, Render, Query } from '@nestjs/common';
import { Config } from 'src/config/index';
import { ToolsService } from '../../../services/tools/tools.service';
import { AccessService } from '../../../services/access/access.service';

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
      list:accessResult[0],
      moduleList:result
  };
  }
}
