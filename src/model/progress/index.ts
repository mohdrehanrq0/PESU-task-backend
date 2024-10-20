import mongoose from "mongoose";

import { IProgress } from "./interface";
import progressSchema from "./schema";

const Progress = mongoose.model<IProgress>("progress", progressSchema);

export default Progress;
