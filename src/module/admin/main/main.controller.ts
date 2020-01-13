import { Controller, Get, Render } from '@nestjs/common';
import { Config } from '../../../config/index';
import { RoleAccessService } from '../../../services/role-access/role-access.service';
import { AccessService } from '../../../services/access/access.service';

@Controller(`${Config.adminPath}/main`)
export class MainController {
  constructor(
    private readonly roleAccessService: RoleAccessService,
    private readonly accessService: AccessService,
  ) {}

  @Get()
  @Render('admin/main/index')
  async index() {
    const role_id = '5d9eae3733b76c32946ce47e';

    const result = await this.accessService.getModel().aggregate([
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items',
        },
      },
      {
        $match: {
          module_id: '0',
        },
      },
    ]);

    const roleAccessResult = await this.roleAccessService.find({ role_id });
    const roleAccessIds = roleAccessResult.map(item =>
      item.access_id.toString(),
    );

    for (let item of result) {
      if (roleAccessIds.includes(item._id.toString())) {
        item.checked = true;
      }

      for (let sub of item.items) {
        if (roleAccessIds.includes(sub._id.toString())) {
          sub.checked = true;
        }
      }
    }
    return {
      asideList: result,
    };
  }

  @Get('welcome')
  @Render('admin/main/welcome')
  welcome() {
    return {};
  }
}
