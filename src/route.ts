import Router from 'express';

import habitRouter from './modules/habit/router';
import progressRouter from './modules/progress/router';
import userRouter from './modules/user/router';

const router = Router();

router.get("/", (_, res) =>
  res.status(200).json({
    success: true,
    status: 200,
    data: "App in up and running!!!!",
  })
);

router.use("/user", userRouter);
router.use("/habits", habitRouter);
router.use("/progress", progressRouter);

export default router;
