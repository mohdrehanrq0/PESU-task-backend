import { Router } from 'express';

import { isAuthenticatedUser } from '../../middleware/auth';
import validator, { ValidationSource } from '../../middleware/validation';
import { userLoginContract, userRegisterContract } from './contract';
import { getUserDetails, registerUser, userLogin, userLogout } from './controller';

const userRouter = Router();

userRouter.post(
  "/signup",
  validator(ValidationSource.BODY, userRegisterContract),
  registerUser
);

userRouter.post(
  "/login",
  validator(ValidationSource.BODY, userLoginContract),
  userLogin
);
userRouter.get("/logout", isAuthenticatedUser, userLogout);
userRouter.get("/", isAuthenticatedUser, getUserDetails);

export default userRouter;
