import { NextFunction, Request, Response } from 'express';

import { ProtectedRequest } from '../../../types/app-request';
import statusCode from '../../constant/statusCode';
import catchAsyncError from '../../middleware/catchAsyncError';
import Progress from '../../model/progress';
import ErrorHandler from '../../utils/errorHandler';

export const getUserProgress = catchAsyncError(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
      const progressRecords = await Progress.find({
        user: req.user._id,
      }).populate("habit");

      if (!progressRecords || progressRecords.length === 0) {
        return next(
          new ErrorHandler(
            "No progress records found for this user",
            statusCode.NOT_FOUND
          )
        );
      }

      let totalCompletionRate = 0;
      const progressData = progressRecords.map((record: any) => {
        const completionRate = parseFloat(record.completionRate.toFixed(2));

        totalCompletionRate += completionRate;

        return {
          habitTitle: record.habit.title,
          habitCategory: record.habit.category,
          streak: record.streak,
          bestStreak: record.bestStreak,
          completionRate,
          lastUpdated: record.completedDates[record.completedDates.length - 1],
        };
      });

      const overallCompletionRate = (
        totalCompletionRate / progressRecords.length
      ).toFixed(2);

      res.status(statusCode.SUCCESS).json({
        success: true,
        message: "progress fetch successfully.",
        overallCompletionRate,
        habits: progressData,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);
