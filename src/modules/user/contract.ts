import Joi from "joi";

export const userRegisterContract = Joi.object({
  email: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("user", "admin").optional(),
  phone: {
    code: Joi.number().optional(),
    number: Joi.number().optional(),
  },
  website: Joi.string().optional(),
  address: {
    streetAddress: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    zipPostal: Joi.string().optional(),
    country: Joi.string().optional(),
  },
  timezone: Joi.string().optional(),
  whatsappAccDetails: {
    verified: Joi.string().optional(),
    display_name: Joi.string().optional(),
    display_image: Joi.string().optional(),
    about: Joi.string().optional(),
    category: Joi.string().optional(),
    description: Joi.string().optional(),
  },
  WABA_id: Joi.string().optional(),
  phone_number_id: Joi.string().optional(),
  auth_code: Joi.string().optional(),
  bearer_token: Joi.string().optional(),
  bearer_expire: Joi.string().optional(),
  isWhatsappVerified: Joi.boolean().optional(),
  whatsapp_number: Joi.number().optional(),
  activeplan: Joi.string().optional(),
  currency: Joi.string().optional(),
  credit: Joi.string().optional(),
  quota: Joi.number().optional(),
  status: Joi.string().optional(),
  fbManagerVerified: Joi.string().optional(),
  dailyTemplateLimit: Joi.number().optional(),
  qualityRating: Joi.string().optional(),
  tagLimit: Joi.number().optional(),
  attributeLimit: Joi.number().optional(),
  freeTierCoversationCount: Joi.number().optional(),
  wabaActivatedOn: Joi.date().optional(),
  templateTier: Joi.string().optional(),
  invoices: [Joi.string().optional()],
  planStartOn: Joi.date().optional(),
  currentPlanMonth: Joi.number().optional(),
  wabaAppStatus: {
    waba_ban_state: Joi.string().optional(),
    waba_ban_date: Joi.string().optional(),
  },
});
export const userLoginContract = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const userGoogleLoginContract = Joi.object({
  token: Joi.string().required(),
});
