import { Router } from 'express';

import { isAuthenticatedUser } from '../../middleware/auth';
import validator, { ValidationSource } from '../../middleware/validation';
import { habitCreateContract, habitUpdateContract } from './contract';
import {
    completeHabit, createHabit, deleteHabit, getAllUserHabit,
    getLastSevenDaysCompletionRateForAllHabits, updateHabit
} from './controller';

const habitRouter = Router();

habitRouter.get("/", isAuthenticatedUser, getAllUserHabit);

habitRouter.get("/complete/:habitId", isAuthenticatedUser, completeHabit);

habitRouter.post(
  "/",
  isAuthenticatedUser,
  validator(ValidationSource.BODY, habitCreateContract),
  createHabit
);

habitRouter.put(
  "/:habitId",
  isAuthenticatedUser,
  validator(ValidationSource.BODY, habitUpdateContract),
  updateHabit
);

habitRouter.get(
  "/graphData",
  isAuthenticatedUser,
  getLastSevenDaysCompletionRateForAllHabits
);

habitRouter.delete("/:habitId", isAuthenticatedUser, deleteHabit);

export default habitRouter;
