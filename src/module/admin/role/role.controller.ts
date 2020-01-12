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
  @Render('admin/role/auth')
  async auth(@Query() query) {
    const {
      id: role_id
    } = query

    const result = await this.accessService.getModel().aggregate([
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
          "module_id": '0'
        }
      }
    ]); 












    

    const roleAccessResult = await this.roleAccessService.find({ role_id })
    const roleAccessIds = roleAccessResult.map(item => item.access_id.toString())

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
      list: result,
      role_id
    }
  }

  @Post('doAuth')
  async doAuth(@Body() body, @Response() res) {
    const {
      role_id,
      access_node
    } = body

    const list = []
    for (let access_id of access_node) {
      list.push({
        access_id,
        role_id
      })
    }

    await this.roleAccessService.deleteMany({ role_id });
    await this.roleAccessService.insertMany(list);
    this.toolsService.success(res, `/${Config.adminPath}/role/auth?id=${role_id}`);
  }
}
