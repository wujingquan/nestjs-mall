import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from '../../interfaces/role.interface';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel('Role')
    private readonly roleModel: Model<Role>,
  ) {}

  async find(json = {}) {
    return await this.roleModel.find(json);
  }

  async findOne(json = {}) {
    return await this.roleModel.findOne(json);
  }

  // getModel() {
  //   return this.roleModel;
  // }
}
