import Joi from 'joi';

export const createTagContract = Joi.object({
  tag: Joi.string().required(),
});

export const searchQueryContract = Joi.object({
  limit: Joi.number().optional(),
  search: Joi.string().required(),
});

export const getQueryContract = Joi.object({
  limit: Joi.number().optional(),
});
