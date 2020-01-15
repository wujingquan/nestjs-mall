import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AccessService {
  constructor(
    @InjectModel('Access')
    private readonly accessModel,
  ) { }

  async find(json) {
    try {
      return await this.accessModel.find(json);
    } catch (err) {
      return null;
    }
  }

  async update(json1, jons2) {
    try {
      return await this.accessModel.updateOne(json1, jons2)
    } catch (err) {
      return null;
    }
  }

  async add(json) {
    try {
      const access = new this.accessModel(json)
      const result = await access.save()
      return result
    } catch (err) {
      return null;
    }
  }

  getModel() {
    return this.accessModel;
  }
}
