import bcrypt from 'bcryptjs';

import { ICookieConfig } from './interface';

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

export const comparePassword = (password: string, hashPassword: string) => {
  return bcrypt.compareSync(password, hashPassword);
};

export const cookieExpiry = 90 * 24 * 3600 * 1000;

export const cookieConfig: ICookieConfig =
  process.env.NODE_ENV === "local"
    ? { httpOnly: true, secure: false, maxAge: cookieExpiry }
    : {
        httpOnly: true,
        secure: true,
        maxAge: cookieExpiry,
        sameSite: "none",
      };
