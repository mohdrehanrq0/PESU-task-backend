import { NextFunction, Request, Response } from 'express';

import { ProtectedRequest } from '../../../../types/app-request';
import statusCode from '../../../constant/statusCode';
import catchAsyncError from '../../../middleware/catchAsyncError';
import Contact from '../../../model/wa/contact';
import ErrorHandler from '../../../utils/errorHandler';

export const registerUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // let payload = {
    //   ...req.body,
    //   password: hashPassword(req.body.password),
    // };

    // let user = await User.create(payload);

    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "User added successfully.",
    });
  }
);

export const createContact = catchAsyncError(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const payload = { ...req.body, userId: req.user._id };

    const contact = await Contact.create(payload);

    if (!contact) {
      return next(
        new ErrorHandler("Something error happen!", statusCode.BAD_REQUEST)
      );
    }
    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "Contact added successfully.",
      contact: contact,
    });
  }
);

export const updateContact = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const contactId = req.params.contactId;

    const payload = req.body;

    let contact = await Contact.findOne({ _id: contactId });

    if (!contact) {
      return next(new ErrorHandler("Contact not found", statusCode.NOT_FOUND));
    }

    contact = await Contact.findOneAndUpdate({ _id: contactId }, payload, {
      new: true,
    }).select("-createdAt -updatedAt -__v");

    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "Contact Update successfully.",
      contact: contact,
    });
  }
);

export const deleteContact = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const contactId = req.params.contactId;
    let contact = await Contact.findOne({ _id: contactId });

    if (!contact) {
      return next(new ErrorHandler("Contact not found", statusCode.NOT_FOUND));
    }

    contact = await Contact.findOneAndDelete({ _id: contactId });

    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "Contact deleted successfully.",
    });
  }
);

export const getUserCreatedContact = catchAsyncError(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    const limit = Number(req.query.limit) | 7;
    const page = Number(req.query.page) | 1;

    const contact = await Contact.findOne({ userId })
      .sort({ updatedAt: -1 })
      .skip(limit ? (page - 1) * limit : 0)
      .limit(limit)
      .select("-createdAt -updatedAt -__v");

    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "Contact fetch successfully.",
      contact,
    });
  }
);
