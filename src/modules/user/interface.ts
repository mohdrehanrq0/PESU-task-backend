export interface ICookieConfig {
  httpOnly: boolean;
  secure: boolean;
  maxAge: number;
  domain?: string;
  sameSite?: boolean | "none" | "strict" | "lax";
}
