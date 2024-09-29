import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import statusCode from "../constant/statusCode";

export enum ValidationSource {
  BODY = "body",
  HEADER = "headers",
  QUERY = "query",
  PARAM = "params",
}

const validator = (
  type: ValidationSource = ValidationSource.BODY,
  contract: Joi.ObjectSchema
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const submitData = req[type];
      await contract.validateAsync(submitData);
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validator;
