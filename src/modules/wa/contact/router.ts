import { Router } from 'express';

import { isAuthenticatedUser } from '../../../middleware/auth';
import validator, { ValidationSource } from '../../../middleware/validation';
import { createContactContract, limitPageContract, updateContactContract } from './contract';
import {
    createContact, deleteContact, getUserCreatedContact, registerUser, updateContact
} from './controller';

const contactRouter = Router();

contactRouter.get(
  "/getUserContact",
  validator(ValidationSource.QUERY, limitPageContract),
  isAuthenticatedUser,
  getUserCreatedContact
);

contactRouter.post(
  "/",
  validator(ValidationSource.BODY, createContactContract),
  isAuthenticatedUser,
  createContact
);

contactRouter.put(
  "/:contactId",
  validator(ValidationSource.BODY, updateContactContract),
  isAuthenticatedUser,
  updateContact
);

contactRouter.delete("/:contactId", isAuthenticatedUser, deleteContact);

export default contactRouter;
