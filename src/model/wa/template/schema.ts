import { Schema } from 'mongoose';

import { componentTypeEnum } from './constant';
import { ITemplate } from './interface';

const templateSchema = new Schema<ITemplate>(
  {
    template_name: String,
    language_code: String,
    component: [
      {
        type: componentTypeEnum,
        parameter: [
          {
            type: String,
            text: String,
            currency: String,
            date_time: String,
            image: {
              link: String,
            },
          },
        ],
      },
    ],
    usecase: String,
    topic: String,
    industry: String,
    header: String,
    body: String,
    body_params: String,
    button: [
      {
        type: String,
        text: String,
        url: String,
        phone_number: Number,
      },
    ],
    tagId: { type: Schema.Types.ObjectId, ref: "tag" },
    categoryId: { type: Schema.Types.ObjectId, ref: "wa_category" },
  },
  { timestamps: true }
);

export default templateSchema;
