import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FocusService {
  constructor(
    @InjectModel('Focus')
    private readonly focusModel
  ) { }

  async find(json = {}, fields?:string){
    try {
      return await this.focusModel.find(json, fields);
    } catch(err) {
      return []
    }
  }

  async add (json) {
    try {
      const focus = new this.focusModel(json);
      const result = focus.save();
      return result
    } catch (err) {
      return null;
    }
  }
}
