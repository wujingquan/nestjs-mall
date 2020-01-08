import { Document, Schema } from 'mongoose';

export interface Role extends Document {
  readonly title?: string;
  readonly description?: string;
  readonly status?: number;
  readonly add_time?: number;
}