import { Types } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  // habits: Types.ObjectId[];
  reward_points: number;
  streak: number;
  reward_badge: "good" | "super" | "mega" | "hyper" | null;
  updatedAt: Date;
  createdAt: Date;
}
