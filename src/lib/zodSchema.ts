import { z } from "zod";

export const NewAppSchema = z.object({
  version: z.string(),
  whatIsNew: z
    .string()
    .min(4, { message: "Can not be less than 4 characters" }),
  appLogo: z.string().url(),
  screenShots: z.string().url().array(),
  appDescription: z
    .string()
    .length(10, { message: "Must be 10 characters long" }),
  ageRating: z.string(),
  appVersion: z.string().min(1, { message: "Required" }),
  privacyPolicyLink: z.string().url(),
  copyRight: z
    .string()
    .min(8, { message: "Can not be less than 8 characters" }),
  dataCollection: z.string().array(),
  loginAccess: z.boolean(),
});

export const RegisterSchema = z.object({
  email: z
    .string()
    .email({ message: "Please input a valid email address" })
    .max(50, { message: "Must contain at most 50 characters" }),
  password: z
    .string()
    .min(4, { message: "Must contain at least 4 characters" })
    .max(20, { message: "Must contain at most 20 characters" }),
});
