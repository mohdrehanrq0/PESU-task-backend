import Joi from "joi";

export const userLoginContract = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
