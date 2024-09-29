import mongoose from 'mongoose';

import { ITemplate } from './interface';
import templateSchema from './schema';

const Template = mongoose.model<ITemplate>("wa_template", templateSchema);

export default Template;
