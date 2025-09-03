import { email, z } from "zod";
import { genralFields } from "../../middleware/validation.middleware";

export const login = {
  body: z.strictObject({
    email: genralFields.email,
    password: genralFields.password,
  }),
};

export const signup = {
  body: login.body.extend({
    username: genralFields.username,
    confirmPassword: genralFields.confirmPassword,
  }),
};
export const confirmEmail = {
  body:z.strictObject({
    email:genralFields.email,
    otp:genralFields.otp
  })
};
