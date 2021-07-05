import mongoose, { Schema, Document } from 'mongoose';

import { User } from '../../../../domain/entities/User';
/*
export enum Gender {
  male = "male",
  female = "female",
  undisclosed = "undisclosed"
}

interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  gender: string;
}

const UserSchema: Schema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
*/

const UserSchema: Schema = new Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    gender: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model<User & Document>('User', UserSchema);
