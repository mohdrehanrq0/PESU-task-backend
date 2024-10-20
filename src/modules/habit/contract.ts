import Joi from 'joi';

export const habitCreateContract = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  category: Joi.string()
    .valid("health", "work", "personal_development", "other")
    .required(),
  frequency: Joi.string().valid("daily", "weekly").required(),
  reminderTime: Joi.string().optional().allow(null),
});

export const habitUpdateContract = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  category: Joi.string()
    .valid("health", "work", "personal_development", "other")
    .optional(),
  frequency: Joi.string().valid("daily", "weekly").optional(),
  reminderTime: Joi.string().optional().allow(null),
});
