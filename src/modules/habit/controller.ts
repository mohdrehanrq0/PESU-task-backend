import { NextFunction, Request, Response } from 'express';
import moment from 'moment';

import { ProtectedRequest } from '../../../types/app-request';
import statusCode from '../../constant/statusCode';
import catchAsyncError from '../../middleware/catchAsyncError';
import Habit from '../../model/habit';
import Progress from '../../model/progress';
import User from '../../model/user';
import ErrorHandler from '../../utils/errorHandler';

export const getAllUserHabit = catchAsyncError(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const habits = await Habit.find({ user: req.user._id }).sort({
      reminderTime: 1,
    });

    if (!habits || habits.length === 0) {
      return next(
        new ErrorHandler("No habits found for this user", statusCode.NOT_FOUND)
      );
    }

    const updatedHabits = [];

    for (const habit of habits) {
      const progress = await Progress.findOne({
        habit: habit._id,
        user: req.user._id,
      });

      let isCompletedToday = false;
      let isCompletedThisWeek = false;

      const today = moment().startOf("day");
      const startOfWeek = moment().startOf("week");

      if (progress) {
        if (habit.frequency === "daily") {
          isCompletedToday = progress.completedDates.some((completedDate) =>
            moment(completedDate).isSame(today, "day")
          );
        }

        if (habit.frequency === "weekly") {
          isCompletedThisWeek = progress.completedDates.some((completedDate) =>
            moment(completedDate).isSameOrAfter(startOfWeek)
          );
        }
      }

      updatedHabits.push({
        // @ts-expect-error
        ...habit._doc,
        completed:
          habit.frequency === "weekly" ? isCompletedThisWeek : isCompletedToday,
      });
    }

    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "User habit fetch successfully.",
      habits: updatedHabits,
    });
  }
);

export const completeHabit = catchAsyncError(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const { habitId } = req.params;

    const habit = await Habit.findOne({ _id: habitId, user: req.user._id });
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const currentDate = new Date().setHours(0, 0, 0, 0);
    const lastCompleted = habit.lastCompletedDate
      ? new Date(habit.lastCompletedDate).setHours(0, 0, 0, 0)
      : null;

    habit.lastCompletedDate = new Date();
    await habit.save();

    let progress = await Progress.findOne({
      habit: habit._id,
      user: req.user._id,
    });

    if (!progress) {
      progress = new Progress({
        user: req.user._id,
        habit: habit._id,
        completedDates: [],
        streak: 0,
        bestStreak: 0,
        pointsEarned: 0,
        completionRate: 0,
      });
    }

    progress.completedDates.push(new Date(currentDate));

    const lastProgressCompleted =
      progress.completedDates[progress.completedDates.length - 2];
    const isConsecutiveDay =
      lastProgressCompleted &&
      new Date(lastProgressCompleted).setHours(0, 0, 0, 0) ===
        currentDate - 24 * 60 * 60 * 1000;

    if (isConsecutiveDay) {
      progress.streak += 1;
    } else {
      progress.streak = 1;
    }

    if (progress.streak > progress.bestStreak) {
      progress.bestStreak = progress.streak;
    }

    progress.pointsEarned += 10;

    const currentDateUpdated = new Date();
    const habitCreationDate = new Date(habit.createdAt);

    const totalDays = Math.max(
      (currentDateUpdated - habitCreationDate) / (1000 * 60 * 60 * 24),
      1
    );

    progress.completionRate =
      (progress.completedDates.length / totalDays) * 100;

    await progress.save();

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (progress.streak >= 100) {
      user.reward_badge = "hyper";
    } else if (progress.streak >= 30) {
      user.reward_badge = "mega";
    } else if (progress.streak >= 15) {
      user.reward_badge = "super";
    } else if (progress.streak >= 7) {
      user.reward_badge = "good";
    } else {
      user.reward_badge = null;
    }
    const lastCompletedDate = user.updatedAt;
    const lastCompletedDateAdjusted = new Date(lastCompletedDate).setHours(
      0,
      0,
      0,
      0
    );
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const isConsecutive =
      lastCompletedDateAdjusted === currentDate - oneDayInMs;

    user.reward_points += progress.pointsEarned;
    const userLastUpdated = new Date(user.updatedAt).setHours(0, 0, 0, 0);
    if (userLastUpdated !== currentDate) {
      if (isConsecutive) {
        user.streak += 1;
      } else {
        user.streak = 1;
      }
    }

    await user.save();

    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "User habit completed successfully.",
      habit,
      user,
      progress,
    });
  }
);

export const createHabit = catchAsyncError(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
      const newHabit = new Habit({
        user: req.user._id,
        title: req.body.title,
        category: req.body.category,
        frequency: req.body.frequency,
        reminderTime:
          req.body.reminderTime === "null"
            ? null
            : req.body.reminderTime || null,
      });

      const savedHabit = await newHabit.save();

      res.status(statusCode.SUCCESS).json({
        success: true,
        message: "User habit added successfully.",
        habit: savedHabit,
      });
    } catch (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
      });
    }
  }
);

export const updateHabit = catchAsyncError(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
      const habitId = req.params.habitId;
      let habit = await Habit.findOne({ _id: habitId });

      if (!habit) {
        return next(new ErrorHandler("Habit not foound", statusCode.NOT_FOUND));
      }

      habit = await Habit.findOneAndUpdate({ _id: habit }, req.body, {
        new: true,
      });

      res.status(statusCode.SUCCESS).json({
        success: true,
        message: "User habit updated successfully.",
        habit: habit,
      });
    } catch (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
      });
    }
  }
);

export const deleteHabit = catchAsyncError(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
      const habitId = req.params.habitId;
      let habit = await Habit.findOne({ _id: habitId });

      if (!habit) {
        return next(new ErrorHandler("Habit not foound", statusCode.NOT_FOUND));
      }

      habit = await Habit.findOneAndDelete({ _id: habitId });

      res.status(statusCode.SUCCESS).json({
        success: true,
        message: "User habit deleted successfully.",
      });
    } catch (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
      });
    }
  }
);

export const getLastSevenDaysCompletionRateForAllHabits = catchAsyncError(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id;

      const progressList = await Progress.find({ user: userId });

      if (progressList.length === 0) {
        return next(
          new ErrorHandler(
            "No progress found for the user.",
            statusCode.NOT_FOUND
          )
        );
      }

      const labels: string[] = [];
      const completionRates: number[] = [];

      for (let i = 6; i >= 0; i--) {
        const date = moment().subtract(i, "days").startOf("day");
        const nextDate = moment(date).add(1, "day");

        labels.push(`Day ${7 - i}`);

        let totalCompletions = 0;
        let habitCount = 0;

        for (const progress of progressList) {
          const completed = progress.completedDates.some(
            (completedDate) =>
              moment(completedDate).isSameOrAfter(date) &&
              moment(completedDate).isBefore(nextDate)
          );
          habitCount++;
          totalCompletions += completed ? 1 : 0;
        }

        const completionRate = (totalCompletions / habitCount) * 100;
        completionRates.push(completionRate);
      }

      res.status(statusCode.SUCCESS).json({
        success: true,
        labels,
        completionRates,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);
