import mongoose from "mongoose";

import { IHabit } from "./interface";
import habitSchema from "./schema";

const Habit = mongoose.model<IHabit>("habit", habitSchema);

export default Habit;
