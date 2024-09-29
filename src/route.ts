import Router from "express";

import userRouter from "./modules/user/router";
import categoryRouter from "./modules/wa/category/router";
import contactRouter from "./modules/wa/contact/router";
import tagRouter from "./modules/wa/tag/router";
import templateRouter from "./modules/wa/template/router";
import webhookRouter from "./modules/webhook/router";

const router = Router();

router.get("/", (_, res) =>
  res.status(200).json({
    success: true,
    status: 200,
    data: "App in up and running!!!!",
  })
);

router.use("/user", userRouter);
router.use("/webhook", webhookRouter);
router.use("/contact", contactRouter);
router.use("/tag", tagRouter);
router.use("/category", categoryRouter);
router.use("/template", templateRouter);

export default router;
