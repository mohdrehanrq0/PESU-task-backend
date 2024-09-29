import { NextFunction, Request, Response } from 'express';

import { ProtectedRequest } from '../../../../types/app-request';
import statusCode from '../../../constant/statusCode';
import catchAsyncError from '../../../middleware/catchAsyncError';
import { Tag } from '../../../model/wa/contact';
import ErrorHandler from '../../../utils/errorHandler';

export const createTag = catchAsyncError(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    let payload = { ...req.body, userId: req.user._id };

    let tag = await Tag.create(payload);

    if (!tag) {
      return next(
        new ErrorHandler(
          "Some error happened",
          statusCode.INTERNAL_SERVER_ERROR
        )
      );
    }

    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "Tag added successfully.",
      tag: tag,
    });
  }
);

export const updateTagController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const Id = req.params.tagId;
    const payload = req.body;

    let tag = await Tag.findOne({ _id: Id });

    if (!tag) {
      return next(new ErrorHandler("Tag Id not found", statusCode.NOT_FOUND));
    }

    tag = await Tag.findOneAndUpdate({ _id: Id }, payload, {
      new: true,
    }).select("-createdAt -updatedAt -__v");

    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "Tag Update successfully.",
      tag: tag,
    });
  }
);

export const searchTag = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const limit = req.query.limit || 7;
    const searchStr = req.query.search;

    const tags = await Tag.find({
      tag: { $regex: searchStr + ".*", $options: "i" },
    })
      .limit(Number(limit))
      .select("-createdAt -updatedAt -__v");

    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "Tag fetch successfully.",
      tag: tags,
    });
  }
);

export const getUserCreatedTag = catchAsyncError(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const limit = req.query.limit || 7;

    const tags = await Tag.find({ userId: req.user._id })
      .limit(Number(limit))
      .select("-createdAt -updatedAt -__v");

    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "User tag fetch successfully.",
      tag: tags,
    });
  }
);
