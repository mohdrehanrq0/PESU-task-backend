import dotenv from "dotenv";
import http from "http";

import app from "./app";
import connectToDB from "./lib/mongoose";

dotenv.config({ path: `.env` });
connectToDB();
// connectToDB();
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, token"
  );

  res.header(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  next();
});
const port = process.env.PORT;
console.log(process.env.PORT);
const httpServer = http
  .createServer(app)
  .on("error", console.error)
  .listen(port, () => console.log(`Server running on Port ${port}`));

httpServer.keepAliveTimeout = 150 * 1000; // (to avoid 502 for long requests, idle timeout is 120s)
httpServer.headersTimeout = 151 * 1000;

//un handled promise rejection
process.on("unhandledRejection", (err: { message: string }) => {
  console.log(`Error : ${err.message}`);
  console.log(`Server is shutting down due to unhandledRejection`);

  httpServer.close(() => {
    process.exit(1);
  });
});
