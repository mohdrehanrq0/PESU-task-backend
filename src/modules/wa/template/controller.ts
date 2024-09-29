import { NextFunction, Request, Response } from "express";

import statusCode from "../../../constant/statusCode";
import catchAsyncError from "../../../middleware/catchAsyncError";

export const createTemplate = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "User added successfully.",
    });
  }
);
