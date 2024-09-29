import { Types } from 'mongoose';

export interface IContact {
  phone: {
    code: number;
    number: number;
  };
  contactName: string;
  tagId: Types.ObjectId[];
  categoryId: Types.ObjectId;
  userId: Types.ObjectId;
}

export interface ITag {
  tag: string;
  userId: Types.ObjectId;
}

export interface ICategory {
  category: string;
  userId: Types.ObjectId;
}
