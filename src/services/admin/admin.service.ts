import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { AdminInterface, AdminModelInterface } from '../../interfaces/admin.interface';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Admin')
    private readonly adminModel: Model<AdminModelInterface>
  ) { }

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
    return await this.adminModel.updateOne(json1, json2)
  }

  async add (json: AdminInterface) {
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
      console.log('from admin service msg ', json)
      const result = await this.adminModel.deleteOne(json)
      console.log('from admin service msg ', result)
      return result
    } catch (error) {
      return null;
    }
  }
}
