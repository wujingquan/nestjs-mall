import { Controller, Get, Render, Query, Post, Body, Response } from '@nestjs/common';
import { Config } from '../../../config/index';
import { RoleService } from '../../../services/role/role.service';
import { ToolsService } from '../../../services/tools/tools.service';
import { AccessService } from '../../../services/access/access.service';
import { RoleAccessService } from '../../../services/role-access/role-access.service';

@Controller(`${Config.adminPath}/role`)
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly toolsService: ToolsService,
    private readonly accessService: AccessService,
    private readonly roleAccessService: RoleAccessService
  ) { }

  @Get()
  @Render('admin/role/index')
  async index() {
    const roleResult = await this.roleService.find();
    return {
      roleResult
    }
  }

  @Get('edit')
  @Render('admin/role/edit')
  async edit(@Query() query) {
    const roleResult = await this.roleService.findOne({ _id: query.id })
    return {
      roleResult
    }
  }

  @Post('doEdit')
  async doEdit(@Body() body, @Response() res) {
    const {
      _id,
      title,
      description
    } = body

    if (!title.length) {
      this.toolsService.error(res, '标题不能为空', `/${Config.adminPath}/role`);
      return;
    }

    const result = await this.roleService.updateOne({
      _id
    }, {
      title,
      description
    })

    if (result) {
      this.toolsService.success(res, `/${Config.adminPath}/role`);
    } else {
      this.toolsService.error(res, '增加失败', `/${Config.adminPath}/role`);
    }
  }

  @Get('delete')
  async delete(@Query() query, @Response() res) {
    const result = await this.roleService.delete({ "_id": query.id });
    this.toolsService.success(res, `/${Config.adminPath}/role`);
  }

  @Get('auth')
  // @Render('admin/role/auth')
  async auth(@Query() query) {
    const {
      id: role_id
    } = query

    // const result = await this.accessService.find({
    //   role_id
    // })
    const result = await this.accessService.getModel().aggregate([
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items'
        }
      },
      // {
      //   $match: {
      //     "module_id": '0'
      //   }
      // }
    ]);

    console.log('role_id', role_id)
    console.log('result', result)

    return {result}
  }
}
