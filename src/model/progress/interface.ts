import { ObjectId, Types } from 'mongoose';

export interface IProgress {
  user: ObjectId;
  habit: ObjectId;
  completedDates: Date[];
  streak: number;
  bestStreak: number;
  pointsEarned: number;
  completionRate: number;
  updatedAt: Date;
  createdAt: Date;
}
