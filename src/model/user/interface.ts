export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: string;
  phone: {
    code: number;
    number: number;
  };
  website: string;
  address: {
    streetAddress: string;
    city: string;
    state: string;
    zipPostal: string;
    country: string;
  };
  timezone: string;
  whatsappAccDetails: {
    verified: String;
    display_name: String;
    display_image: String;
    about: String;
    category: String;
    description: String;
  };
  WABA_id: string;
  phone_number_id: string;
  auth_code: string;
  bearer_token: string;
  bearer_expire: Date;
  isWhatsappVerified: boolean;
  whatsapp_number: number;
  activeplan: string;
  currency: string;
  credit: string;
  quota: number;
  status: string;
  fbManagerVerified: string;
  dailyTemplateLimit: number;
  qualityRating: string;
  tagLimit: number;
  attributeLimit: number;
  freeTierCoversationCount: number;
  wabaActivatedOn: Date;
  templateTier: string;
  invoices: [String];
  planStartOn: Date;
  currentPlanMonth: number;
  wabaAppStatus: {
    waba_ban_state: string;
    waba_ban_date: string;
  };
}
