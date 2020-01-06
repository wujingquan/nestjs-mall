import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from '../../interfaces/admin.interface';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Admin')
    private readonly adminModel: Model<Admin>,
  ) {}

  async find(json = {}) {
    return await this.adminModel.find(json);
  }

  async findOne(json = {}) {
    return await this.adminModel.findOne(json);
  }
}
