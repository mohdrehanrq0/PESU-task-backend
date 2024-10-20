import mongoose, { Schema } from 'mongoose';

import { IUser } from './interface';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    reward_points: {
      type: Number,
      default: 0,
    },
    reward_badge: {
      type: String,
      enum: ["good", "super", "mega", "hyper", null],
      default: null,
    },
    streak: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default userSchema;
