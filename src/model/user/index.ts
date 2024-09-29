import mongoose from "mongoose";

import { IUser } from "./interface";
import userSchema from "./schema";

const User = mongoose.model<IUser>("user", userSchema);

export default User;
