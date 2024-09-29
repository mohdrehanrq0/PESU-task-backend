import { Router } from 'express';

import validator, { ValidationSource } from '../../middleware/validation';
import { userGoogleLoginContract, userLoginContract, userRegisterContract } from './contract';
import { registerUser, userGoogleLogin, userLogin } from './controller';

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

// TODO: remaing work to do
userRouter.post(
  "/google",
  validator(ValidationSource.BODY, userGoogleLoginContract),
  userGoogleLogin
);

export default userRouter;
