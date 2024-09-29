import { Schema } from "mongoose";

import { UserRole } from "./constant";
import { IUser } from "./interface";

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    password: { type: String },
    role: {
      type: String,
      required: true,
      enum: UserRole,
      default: "user",
    },
    phone: {
      code: {
        type: Number,
      },
      number: {
        type: Number,
      },
    },
    website: String,
    address: {
      streetAddress: String,
      city: String,
      state: String,
      zipPostal: String,
    },
    timezone: String,
    whatsappAccDetails: {
      verified: String,
      display_name: String,
      display_image: String,
      about: String,
      category: String,
      description: String,
    },
    WABA_id: String,
    phone_number_id: String,
    auth_code: String,
    bearer_token: String,
    bearer_expire: Date,
    isWhatsappVerified: Boolean,
    whatsapp_number: Number,
    activeplan: String,
    currency: String,
    credit: String,
    quota: Number,
    status: String,
    fbManagerVerified: String,
    dailyTemplateLimit: Number,
    qualityRating: String,
    tagLimit: Number,
    attributeLimit: Number,
    freeTierCoversationCount: Number,
    wabaActivatedOn: Date,
    templateTier: String,
    invoices: Array,
    planStartOn: Date,
    currentPlanMonth: Number,
    wabaAppStatus: {
      waba_ban_state: String,
      waba_ban_date: String,
    },
  },
  { timestamps: true }
);

export default userSchema;
