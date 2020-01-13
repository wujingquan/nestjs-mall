import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Config } from '../../config';
import {
  AdminInterface,
  AdminModelInterface,
} from '../../interfaces/admin.interface';
import { AccessService } from '../access/access.service';
import { RoleAccessService } from '../role-access/role-access.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Admin')
    private readonly adminModel: Model<AdminModelInterface>,
    private readonly accessService: AccessService,
    private readonly roleAccessService: RoleAccessService,
  ) {}

  async find(json = {}) {
    return await this.adminModel.find(json);
  }

  async findOne(json = {}) {
    return await this.adminModel.findOne(json);
  }

  getModel() {
    return this.adminModel;
  }

  async updateOne(json1: AdminInterface, json2: AdminInterface) {
    return await this.adminModel.updateOne(json1, json2);
  }

  async add(json: AdminInterface) {
    try {
      const admin = new this.adminModel(json);
      const result = await admin.save();
      return result;
    } catch (error) {
      return null;
    }
  }

  async delete(json) {
    try {
      console.log('from admin service msg ', json);
      const result = await this.adminModel.deleteOne(json);
      console.log('from admin service msg ', result);
      return result;
    } catch (error) {
      return null;
    }
  }

  async checkAuth(req) {
    let pathname = req.baseUrl;
    pathname = pathname.replace(`/${Config.adminPath}/`, '');
    const userinfo = req.session.userinfo;
    const role_id = userinfo.role_id;

    const whiteList = [
      'login/logOut',
      'main/welcome',
      'main',
      'login',
      'login/doLogin',
    ];
    if (userinfo.is_super === 1 || whiteList.includes(pathname)) {
      return true;
    }

    const accessResult = await this.accessService.find({ url: pathname });
    const roleAccessResult = await this.roleAccessService.find({ role_id });
    const accessId = accessResult[0]._id.toString();
    const hasAccess = roleAccessResult.find(
      item => item._id.toString() === accessId,
    );

    if (accessResult.length) return false;
    return hasAccess ? true : false;
  }
}
