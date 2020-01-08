import { Controller, Get, Render, Query, Post, Body } from '@nestjs/common';
import { Config } from '../../../config/index';
import { AdminService } from '../../../services/admin/admin.service';
import { RoleService } from '../../../services/role/role.service';

@Controller(`${Config.adminPath}/manager`)
export class ManagerController {
  constructor(
    private readonly adminService: AdminService,
    private readonly roleService: RoleService
  ) {}

  @Get()
  @Render('admin/manager/index')
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
    console.log(JSON.stringify(result))
    return {
      adminResult: result
    };
  }

  @Get('add')
  @Render('admin/manager/add')
  add() {
    return {};
  }

  @Get('edit')
  @Render('admin/manager/edit')
  async edit (@Query() query) {
    const adminResult = await this.adminService.findOne({ _id: query.id });
    const roleResult = await this.roleService.find();
    console.log(roleResult)
    return {
      adminResult,
      roleResult
    }
  }

  @Post('doEdit')
  async doEdit(@Body() body) {
    console.log(body)

    let {
      _id,
      password,
      mobile,
      email,
      role_id
    } = body

    if (!password.length) {
      await this.adminService.updateOne({
        _id: '123',
      }, {
        email: '123'
      });
    }

    // if () {

    // }

    
    
    return 1;
  }
}
