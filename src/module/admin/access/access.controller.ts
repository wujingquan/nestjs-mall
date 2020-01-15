import { Controller, Get, Render } from '@nestjs/common';
import { Config } from 'src/config/index';
import { ToolsService } from '../../../services/tools/tools.service';
import { AccessService } from '../../../services/access/access.service';

@Controller(`${Config.adminPath}/access`)
export class AccessController {
  constructor(
    private readonly toolsService: ToolsService,
    private readonly accessService: AccessService,
  ) {}

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
}
