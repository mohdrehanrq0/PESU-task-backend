import { Router } from "express";

import validator, { ValidationSource } from "../../../middleware/validation";
import { userLoginContract } from "./contract";
import { createTemplate } from "./controller";

const templateRouter = Router();

templateRouter.post("/", createTemplate);

export default templateRouter;
