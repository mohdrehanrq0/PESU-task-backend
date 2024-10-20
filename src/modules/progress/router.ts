import { Router } from 'express';

import { isAuthenticatedUser } from '../../middleware/auth';
import { getUserProgress } from './controller';

const progressRouter = Router();

progressRouter.get("/", isAuthenticatedUser, getUserProgress);

export default progressRouter;
