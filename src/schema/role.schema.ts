import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const d = new Date();

export const RoleSchema = new mongoose.Schema({
  title: String,

  description: String,

  status: {
    type: Number,
    default: 1,
  },

  add_time: {
    type: Number,
    default: d.getTime(),
  },
});
