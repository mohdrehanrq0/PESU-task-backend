import { NextFunction, Request, Response } from "express";

import { ProtectedRequest } from "../../types/app-request";

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export default (theFunc: AsyncFunction) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };
