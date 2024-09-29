import { Schema } from 'mongoose';

import { ICategory, IContact, ITag } from './interface';

const contactSchema = new Schema<IContact>(
  {
    phone: {
      code: Number,
      number: Number,
    },
    contactName: String,
    tagId: { type: [Schema.Types.ObjectId], ref: "tag", default: [] },
    categoryId: { type: Schema.Types.ObjectId, ref: "wa_category" },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

export const tagSchema = new Schema<ITag>(
  {
    tag: String,
    userId: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);
export const categorySchema = new Schema<ICategory>(
  {
    category: String,
    userId: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

export default contactSchema;
