import { Controller, Get, Render } from '@nestjs/common';
import { Config } from '../../../config/index';
import { AdminService } from 'src/services/admin/admin.service';

@Controller(`${Config.adminPath}/manager`)
export class ManagerController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  // @Render('admin/manager/index')
  async index() {
    const result = await this.adminService.getModel().aggregate([
      {
        $lookup: {
          from: 'role',
          localField: 'role_id',
          foreignField: '_id',
          as: 'role',
        },
      },
    ]);
    // const result = await this.adminService.getModel().aggregate($project: {
    //   username: 1
    // })
    // console.log(result);
    // db.mycol.aggregate([
    //   {
    //     $group: {
    //       _id: '$by_user', num_tutorial: {
    //         $sum: 1 
    //       } 
    //     } 
    //   },
    // ]);
    // return {};
    return result;
  }

  @Get('add')
  @Render('admin/manager/add')
  add() {
    return {};
  }
}
