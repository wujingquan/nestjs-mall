import { Schema, Document } from 'mongoose';

export interface AdminInterface {
  readonly _id?: Schema.Types.ObjectId;
  readonly username?: string;
  readonly password?: string;
  readonly mobile?: string;
  readonly email?: string;
  readonly status?: number;
  readonly role_id?: Schema.Types.ObjectId;
  readonly add_time?: number;
  readonly is_super?: number;
  readonly hello?: number;
}

export interface AdminModelInterface extends Document {
  readonly _id: Schema.Types.ObjectId;
  readonly username: string;
  readonly password: string;
  readonly mobile: string;
  readonly email: string;
  readonly status: number;
  readonly role_id: Schema.Types.ObjectId;
  readonly add_time: number;
  readonly is_super: number;
}
