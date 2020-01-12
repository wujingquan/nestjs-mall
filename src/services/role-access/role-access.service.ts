import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoleAccessService {
  constructor(
    @InjectModel('RoleAccess')
    private readonly roleAccessModel
  ){}

  async find(json) {
    try {
      return this.roleAccessModel.find(json)
    } catch(err) {
      return null
    }
  }
  
  async deleteMany(json) {
    try {
      return await this.roleAccessModel.deleteMany(json)
    } catch(err) {
      return null
    }
  }

  async insertMany(json) {
    try {
      return await this.roleAccessModel.insertMany(json)
    } catch(err) {
      return null
    }
  }

}
