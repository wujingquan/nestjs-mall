import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const d = new Date();

export const AccessSchema = new mongoose.Schema({
  /**
   * 模块名称
   */
  module_name: String,

  /**
   * 操作名称
   */
  action_name: String,

  /**
   * 节点类型
   * 1 模块
   * 2 菜单
   * 3 操作
   */
  type: Number,

  /**
   * 路由跳转地址
   */
  url: String,

  /**
   * 此 module_id 和 当前模型 的 _id 关联
   * 0 模块
   */
  module_id: {
    type: Schema.Types.Mixed
  },

  sort: {
    type: Number,
    default: 100,
    description: String,
    status: {
      type: Number,
      default: 1
    },
    add_time: {
      type: Number,
      default: d.getTime()
    }
  }
});