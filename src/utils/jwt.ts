import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const getJWTtoken = async (userId: Types.ObjectId) => {
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const verifyJWTtoken = async (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};
