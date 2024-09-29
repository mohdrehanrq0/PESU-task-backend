import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';

import { ProtectedRequest } from '../../../types/app-request';
import statusCode from '../../constant/statusCode';
import catchAsyncError from '../../middleware/catchAsyncError';
import User from '../../model/user';
import ErrorHandler from '../../utils/errorHandler';
import { getJWTtoken } from '../../utils/jwt';
import { comparePassword, hashPassword } from './utils';

export const metaWebhookPostController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // log incoming messages
    console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));
    console.log("Incoming webhook message:", req.body);

    // check if the webhook request contains a message
    // details on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
    const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];

    // check if the incoming message contains text
    if (message?.type === "text") {
      // extract the business number to send the reply from it
      const business_phone_number_id =
        req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;

      // send a reply message as per the docs here https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages
      // await axios({
      //   method: "POST",
      //   url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
      //   headers: {
      //     Authorization: `Bearer ${process.env.GRAPH_API_TOKEN}`,
      //   },
      //   data: {
      //     messaging_product: "whatsapp",
      //     to: message.from,
      //     text: { body: "Echo: " + message.text.body },
      //     context: {
      //       message_id: message.id, // shows the message as a reply to the original user message
      //     },
      //   },
      // });

      // // mark incoming message as read
      // await axios({
      //   method: "POST",
      //   url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
      //   headers: {
      //     Authorization: `Bearer ${process.env.GRAPH_API_TOKEN}`,
      //   },
      //   data: {
      //     messaging_product: "whatsapp",
      //     status: "read",
      //     message_id: message.id,
      //   },
      // });
    }

    res.sendStatus(200);
  }
);

export const metaWebhookGetController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    console.log("Webhook unverified successfully!", challenge);
    // check the mode and token sent are correct
    if (
      mode &&
      mode === "subscribe" &&
      token === process.env.WEBHOOK_VERIFY_TOKEN
    ) {
      // respond with 200 OK and challenge token from the request
      res.status(200).send(challenge);
      console.log("Webhook verified successfully!");
    } else {
      // respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
);
