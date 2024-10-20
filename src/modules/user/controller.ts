import { NextFunction, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';

import { ProtectedRequest } from '../../../types/app-request';
import statusCode from '../../constant/statusCode';
import catchAsyncError from '../../middleware/catchAsyncError';
import User from '../../model/user';
import ErrorHandler from '../../utils/errorHandler';
import { getJWTtoken } from '../../utils/jwt';
import { comparePassword, hashPassword } from './utils';

export const registerUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    let user = new User({
      ...req.body,
      ...(req.body.password
        ? { password: hashPassword(req.body.password) }
        : {}),
    });

    const savedUser = await user.save();

    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "User added successfully.",
      user: savedUser,
    });
  }
);

export const userLogin = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    let userData = await User.findOne({ email: email });

    if (!userData) {
      return next(new ErrorHandler("User not found", statusCode.NOT_FOUND));
    }

    let match = comparePassword(password, userData.password);

    if (!match) {
      return next(
        new ErrorHandler(
          "Email and password is invalid",
          statusCode.UNAUTHORIZED
        )
      );
    }

    const accessToken = await getJWTtoken(userData._id);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 90 * 24 * 3600 * 1000,
    });
    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "User login successfully.",
      accessToken,
    });
  }
);

export const userLogout = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      maxAge: 90 * 24 * 3600 * 1000,
    });

    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "User loggedOut successfully.",
    });
  }
);

export const getUserDetails = catchAsyncError(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    res.status(statusCode.SUCCESS).json({
      success: true,
      user: req.user,
    });
  }
);
