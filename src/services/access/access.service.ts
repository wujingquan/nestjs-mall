import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AccessService {
  constructor(
    @InjectModel('Access')
    private readonly accessModel
  ){}

  async find(json) {
    try {
      return await this.accessModel.find(json)
    } catch(err) {
      return null
    }
  }

  getModel() {
    return this.accessModel
  }
}
