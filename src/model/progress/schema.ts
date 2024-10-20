import mongoose, { Schema } from 'mongoose';

import { IProgress } from './interface';

const progressSchema = new Schema<IProgress>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    habit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "habit",
      required: true,
    },
    completedDates: {
      type: [Date],
      default: [],
    },
    streak: {
      type: Number,
      default: 0,
    },
    bestStreak: {
      type: Number,
      default: 0,
    },
    pointsEarned: {
      type: Number,
      default: 0,
    },
    completionRate: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default progressSchema;
