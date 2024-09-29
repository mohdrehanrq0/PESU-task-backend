import mongoose from 'mongoose';

import { ICategory, IContact, ITag } from './interface';
import contactSchema, { categorySchema, tagSchema } from './schema';

export const Tag = mongoose.model<ITag>("tag", tagSchema);
export const WaCategory = mongoose.model<ICategory>(
  "wa_category",
  categorySchema
);

const Contact = mongoose.model<IContact>("wa_contacts", contactSchema);

export default Contact;
