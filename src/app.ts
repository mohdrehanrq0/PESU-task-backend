import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import fs from "fs";
import helmet from "helmet";
import morgan from "morgan";

import ErrorConstants from "./constant/errorConstants";
import statusCode from "./constant/statusCode";
import ErrorMiddleware from "./middleware/error";
import router from "./route";
import { corsRegex, corsWhitelist, environment } from "./utils/config";
import ErrorHandler from "./utils/errorHandler";

const corsConfig = {
  credentials: true,
  origin: function (origin: string | undefined, callback: any) {
    if (!origin) {
      //for bypassing postman req with  no origin
      return callback(null, true);
    }
    if (origin && (corsWhitelist.includes(origin) || corsRegex.test(origin))) {
      callback(null, true);
    } else {
      callback(
        new ErrorHandler(
          "Not allowed by CORS",
          statusCode.INTERNAL_SERVER_ERROR
        )
      );
    }
  },
  optionsSuccessStatus: 200,
};
const app = express();
app.use(cookieParser());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet.crossOriginEmbedderPolicy({ policy: "credentialless" }));
app.use("/api/v1", cors(corsConfig), router);

//checking for a upload folder
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

app.use(ErrorMiddleware);
export default app;
