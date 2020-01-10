import { Controller, Get, Render, Query, Post, Body, Response } from '@nestjs/common';
import { Config } from '../../../config/index';
import { AdminService } from '../../../services/admin/admin.service';
import { RoleService } from '../../../services/role/role.service';
import { ToolsService } from '../../../services/tools/tools.service';

@Controller(`${Config.adminPath}/manager`)
export class ManagerController {
  constructor(
    private readonly adminService: AdminService,
    private readonly roleService: RoleService,
    private readonly toolsService: ToolsService
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

    return {
      adminResult: result
    };
  }

  @Get('add')
  @Render('admin/manager/add')
  async add() {
    const roleResult = await this.roleService.find();
    
    return {
      roleResult
    };
  }

  @Post('doAdd')
  async doAdd(@Body() body, @Response() res) {
    console.log(body)

    const {
      username,
      password
    } = body

    if (!username.length || password.length < 6) {
      this.toolsService.error(res, '用户名或者密码长度不合法', `/${Config.adminPath}/manager/add`);
      return {};
    }

    const adminResult = await this.adminService.findOne({username})
    if (adminResult) {
      this.toolsService.error(res, '此管理已经存在', `/${Config.adminPath}/manager/add`);
      return {}
    }

    await this.adminService.add({
      ...body,
      password: this.toolsService.getMd5(password)
    })
    this.toolsService.success(res, `/${Config.adminPath}/manager`);
  }

  @Get('edit')
  @Render('admin/manager/edit')
  async edit (@Query() query) {
    const adminResult = await this.adminService.findOne({ _id: query.id });
    const roleResult = await this.roleService.find();
    return {
      adminResult,
      roleResult
    }
  }

  @Post('doEdit')
  async doEdit(@Body() body, @Response() res) {
    const {
      _id,
      password
    } = body

    if (password.length && password.length < 6) {
      this.toolsService.error(res, '密码长度不合法', `/${Config.adminPath}/manager/edit?id=${_id}`)
      return {};
    }
    
    if (!password.length) {
      await this.adminService.updateOne({
        _id
      }, body);

      this.toolsService.success(res, `/${Config.adminPath}/manager`);
      return {};
    }

    if (password.length >= 6) {
      await this.adminService.updateOne({
        _id
      }, {
        ...body,
        password: this.toolsService.getMd5(password)
      })

      this.toolsService.success(res, `/${Config.adminPath}/manager`);
      return {}
    }
  }

  @Get('doDelete')
  async doDelete(@Query() query, @Response() res) {
    const result = await this.adminService.delete({ _id: query.id });
    console.log(result)
    this.toolsService.success(res, `/${Config.adminPath}/manager`);
  }
}
