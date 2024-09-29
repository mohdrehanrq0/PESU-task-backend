import { NextFunction, Request, Response } from 'express';

import { ProtectedRequest } from '../../../../types/app-request';
import statusCode from '../../../constant/statusCode';
import catchAsyncError from '../../../middleware/catchAsyncError';
import { WaCategory } from '../../../model/wa/contact';
import ErrorHandler from '../../../utils/errorHandler';

export const createWaCategory = catchAsyncError(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    let payload = { ...req.body, userId: req.user._id };

    let category = await WaCategory.create(payload);

    if (!category) {
      return next(
        new ErrorHandler(
          "Some error happened",
          statusCode.INTERNAL_SERVER_ERROR
        )
      );
    }

    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "Category added successfully.",
      category: category,
    });
  }
);

export const updateWaCategoryController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const Id = req.params.categoryId;
    const payload = req.body;

    let category = await WaCategory.findOne({ _id: Id });

    if (!category) {
      return next(
        new ErrorHandler("Category Id not found", statusCode.NOT_FOUND)
      );
    }

    category = await WaCategory.findOneAndUpdate({ _id: Id }, payload, {
      new: true,
    }).select("-createdAt -updatedAt -__v");

    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "WaCategory Update successfully.",
      category: category,
    });
  }
);

export const searchWaCategory = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const limit = req.query.limit || 7;
    const searchStr = req.query.search;

    const category = await WaCategory.find({
      category: { $regex: searchStr + ".*", $options: "i" },
    })
      .limit(Number(limit))
      .select("-createdAt -updatedAt -__v");

    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "WaCategory fetch successfully.",
      category: category,
    });
  }
);

export const getUserCreatedWaCategory = catchAsyncError(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const limit = req.query.limit || 7;

    const category = await WaCategory.find({ userId: req.user._id })
      .limit(Number(limit))
      .select("-createdAt -updatedAt -__v");

    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "User category fetch successfully.",
      category: category,
    });
  }
);
