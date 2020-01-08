import { Document, Schema } from 'mongoose';

export interface Admin extends Document {
  readonly _id?;
  readonly username?: string;
  readonly password?: string;
  readonly mobile?: string;
  readonly email?: string;
  readonly status?: number;
  readonly role_id?: Schema.Types.ObjectId;
  readonly add_time?: number;
  readonly is_super?: number;
}
