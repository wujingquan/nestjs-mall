import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel('Role')
    private readonly roleModel
  ) {}

  async find(json = {}) {
    return await this.roleModel.find(json);
  }

  async findOne(json = {}) {
    return await this.roleModel.findOne(json);
  }
}
