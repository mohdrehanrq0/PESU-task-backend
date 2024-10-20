import mongoose, { Schema } from 'mongoose';

import { IHabit } from './interface';

const habitSchema = new Schema<IHabit>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["health", "work", "personal_development", "other"],
      required: true,
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly"],
      required: true,
    },
    reminderTime: {
      type: String,
      default: null,
    },
    // streak: {
    //   type: Number,
    //   default: 0,
    // },
    // bestStreak: {
    //   type: Number,
    //   default: 0,
    // },
    // pointsEarned: {
    //   type: Number,
    //   default: 0,
    // },
    lastCompletedDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default habitSchema;
