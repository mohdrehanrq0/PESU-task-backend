import { Router } from 'express';

import { isAuthenticatedUser } from '../../../middleware/auth';
import validator, { ValidationSource } from '../../../middleware/validation';
import { createTagContract, getQueryContract, searchQueryContract } from './contract';
import { createTag, getUserCreatedTag, searchTag, updateTagController } from './controller';

const tagRouter = Router();

tagRouter.post(
  "/",
  validator(ValidationSource.BODY, createTagContract),
  isAuthenticatedUser,
  createTag
);

tagRouter.put(
  "/:tagId",
  validator(ValidationSource.BODY, createTagContract),
  isAuthenticatedUser,
  updateTagController
);

tagRouter.get(
  "/search",
  validator(ValidationSource.QUERY, searchQueryContract),
  isAuthenticatedUser,
  searchTag
);

tagRouter.get(
  "/user_tags",
  validator(ValidationSource.QUERY, getQueryContract),
  isAuthenticatedUser,
  getUserCreatedTag
);

export default tagRouter;
