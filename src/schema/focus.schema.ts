import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const d = new Date();

export const FocusSchema = new mongoose.Schema({
  title: String,

  type: Number,

  focus_img: String,

  link: String,

  sort: Number,

  status: {
    type: Number,
    default: 1,
  },

  add_time: {
    type: Number,
    default: d.getTime(),
  },
});
