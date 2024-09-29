import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose.set("strictQuery", false);
const connectToDB = () =>
  mongoose
    .connect(String(process.env.MONGO_URI))
    .then(() => console.log("connected to mongodb"))
    .catch(console.error);

export default connectToDB;
