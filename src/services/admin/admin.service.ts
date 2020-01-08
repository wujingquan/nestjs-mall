import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from '../../interfaces/admin.interface';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Admin')
    private readonly adminModel: Model<Admin>
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

  async updateOne(json1: Admin, json2: Admin ) {
    return await this.adminModel.updateOne(json1, json2)
  }
}
