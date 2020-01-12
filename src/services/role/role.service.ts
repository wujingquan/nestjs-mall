import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel('Role')
    private readonly roleModel,
  ) {}

  async find(json = {}) {
    return await this.roleModel.find(json);
  }

  async findOne(json = {}) {
    return await this.roleModel.findOne(json);
  }

  async updateOne(json1, josn2) {
    try {
      return await this.roleModel.updateOne(json1, josn2);
    } catch (err) {
      return null;
    }
  }

  async delete(json) {
    try {
      return await this.roleModel.deleteOne(json);
    } catch (err) {
      return null;
    }
  }
}
