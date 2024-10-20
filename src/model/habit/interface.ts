import { ObjectId, Types } from 'mongoose';

export interface IHabit {
  user: ObjectId;
  title: string;
  category: "health" | "work" | "personal_development" | "other";
  frequency: "daily" | "weekly";
  reminderTime?: string | null;
  // streak: number;
  // bestStreak: number;
  // pointsEarned: number;
  lastCompletedDate?: Date | null;
  updatedAt: Date;
  createdAt: Date;
}
