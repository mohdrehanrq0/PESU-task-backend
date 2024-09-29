import { Types } from 'mongoose';

import { componentTypeEnum } from './constant';

export interface ITemplate {
  template_name: string;
  language_code: string;
  component?: {
    type: componentTypeEnum;
    parameter: {
      type: string;
      text: string;
      currency: string;
      date_time: string;
      image: {
        link: string;
      };
    }[];
  }[];
  categoryId: Types.ObjectId;
  usecase: string;
  tagId: Types.ObjectId;
  topic: string;
  industry: string;
  header: string;
  body: string;
  body_params: string[];
  button: {
    type: string;
    text: string;
    url: string;
    phone_number: number;
  }[];
}
