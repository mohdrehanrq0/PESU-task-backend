import Joi from 'joi';

export const createContactContract = Joi.object({
  phone: {
    code: Joi.number().required(),
    number: Joi.number().required(),
  },
  contactName: Joi.string().required(),
  tagId: Joi.array().items(Joi.string().length(24).hex().optional()),
  categoryId: Joi.string().length(24).hex().optional(),
});

export const updateContactContract = Joi.object({
  phone: {
    code: Joi.number().optional(),
    number: Joi.number().optional(),
  },
  contactName: Joi.string().optional(),
  tagId: Joi.array().items(Joi.string().length(24).hex().optional()),
  categoryId: Joi.string().length(24).hex().optional(),
});

export const limitPageContract = Joi.object({
  limit: Joi.number().optional(),
  page: Joi.number().optional(),
});
