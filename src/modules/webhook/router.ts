import { Router } from 'express';

import validator, { ValidationSource } from '../../middleware/validation';
import { metaWebhookGetController, metaWebhookPostController } from './controller';

const webhookRouter = Router();

webhookRouter.post("/meta", metaWebhookPostController);
webhookRouter.get("/meta", metaWebhookGetController);

export default webhookRouter;
