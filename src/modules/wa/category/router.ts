import { Router } from 'express';

import { isAuthenticatedUser } from '../../../middleware/auth';
import validator, { ValidationSource } from '../../../middleware/validation';
import { createCategoryContract, getQueryContract, searchQueryContract } from './contract';
import {
    createWaCategory, getUserCreatedWaCategory, searchWaCategory, updateWaCategoryController
} from './controller';

const categoryRouter = Router();

categoryRouter.post(
  "/",
  validator(ValidationSource.BODY, createCategoryContract),
  isAuthenticatedUser,
  createWaCategory
);

categoryRouter.put(
  "/:categoryId",
  validator(ValidationSource.BODY, createCategoryContract),
  isAuthenticatedUser,
  updateWaCategoryController
);

categoryRouter.get(
  "/search",
  validator(ValidationSource.QUERY, searchQueryContract),
  isAuthenticatedUser,
  searchWaCategory
);

categoryRouter.get(
  "/user_category",
  validator(ValidationSource.QUERY, getQueryContract),
  isAuthenticatedUser,
  getUserCreatedWaCategory
);

export default categoryRouter;
