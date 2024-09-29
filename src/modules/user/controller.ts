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
    let payload = {
      ...req.body,
      ...(req.body.password
        ? { password: hashPassword(req.body.password) }
        : {}),
    };

    let user = await User.create(payload);

    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "User added successfully.",
      user,
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

export const userGoogleLogin = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const { token } = req.body;

    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      //TODO: to do work here
      res.status(statusCode.SUCCESS).json({
        success: true,
        message: "User login successfully.",
        user: payload,
      });
    } catch (err) {
      console.log(err);
      res.status(statusCode.BAD_REQUEST).json({
        success: true,
        message: "Something error occur.",
      });
    }

    // let userData = await User.findOne({ email: email });

    //   if (!userData) {
    //     return next(new ErrorHandler("User not found", statusCode.NOT_FOUND));
    //   }

    //   let match = comparePassword(password, userData.password);

    //   if (!match) {
    //     return next(
    //       new ErrorHandler(
    //         "Email and password is invalid",
    //         statusCode.UNAUTHORIZED
    //       )
    //     );
    //   }

    //   const accessToken = await getJWTtoken(userData._id);

    //   res.cookie("accessToken", accessToken, {
    //     httpOnly: true,
    //     secure: false,
    //     maxAge: 90 * 24 * 3600 * 1000,
    //   });
    //   res.status(statusCode.SUCCESS).json({
    //     success: true,
    //     message: "User login successfully.",
    //     user: userData,
    //     accessToken,
    //   });
  }
);
