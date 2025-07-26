import { z } from "zod";
import isMobilePhone from "validator/es/lib/isMobilePhone";

export const NewAppSchema = z.object({
  appLogo: z.any(),
  apk: z.any(),
  screenShots: z.any().array(),
  appCat: z.string(),
  appType: z.string(),
  appName: z.string(),
  appDescription: z.string(),
  rating: z.coerce.number().max(21),
  appVersion: z.string().min(1, { message: "Required" }),
  appPrivacyPolicy: z.string().url(),
  copyright: z.string(),
  loginAccess: z.boolean().optional(),
  appuserName: z.string().optional(),
  appPassword: z.string().optional(),
  dataCollected: z.string().array().optional(),
});

export const EditAppSchema = z.object({
  whatsNew: z.string().min(4, { message: "Can not be less than 4 characters" }),
  appLogo: z.any().optional(),
  apk: z.any().optional(),
  screenShots: z.any().optional().array(),
  appCat: z.string(),
  appType: z.string(),
  appName: z.string(),
  appDescription: z.string(),
  rating: z.coerce.number().max(21),
  appVersion: z.string().min(1, { message: "Required" }),
  appPrivacyPolicy: z.string().url(),
  copyright: z.string(),
  loginAccess: z.boolean().optional(),
  appuserName: z.string().optional(),
  appPassword: z.string().optional(),
  dataCollected: z.string().array().optional(),
});

export const VerifyEmailSchema = z.object({
  OTP: z.string().length(6, { message: "Must be 6 digits long" }),
});

export const VerifyEmail2Schema = z.object({
  OTP: z.string().length(4, { message: "Must be 4 digits long" }),
});

export const EmailSchema = z.object({
  email: z
    .string()
    .email({ message: "Please input a valid email address" })
    .max(50, { message: "Must contain at most 50 characters" }),
});

export const RegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "Can not be less than 2 characters" })
      .max(40, { message: "Can not be more than 40 characters" }),
    email: z
      .string()
      .email({ message: "Please input a valid email address" })
      .max(50, { message: "Must contain at most 50 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Can not be less than 2 characters" })
      .max(40, { message: "Can not be more than 40 characters" }),
    businessName: z
      .string()
      .min(2, { message: "Can not be less than 2 characters" })
      .max(40, { message: "Can not be more than 40 characters" }),
    // phoneNumber: z.string(),
    phoneNumber: z.string().refine(isMobilePhone),
    password: z
      .string()
      .regex(/^(?=.*[a-z])/, { message: "Must include a lowercase character" })
      .regex(/^(?=.*[A-Z])/, { message: "Must include an uppercase character" })
      .regex(/^(?=.*[0-9])/, { message: "Must include a digit" })
      .regex(/^(?=.*[^\w\s\d])/, {
        message: "Must include a special character",
      })
      .min(6, { message: "Must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .regex(/^(?=.*[a-z])/, { message: "Must include a lowercase character" })
      .regex(/^(?=.*[A-Z])/, { message: "Must include an uppercase character" })
      .regex(/^(?=.*[0-9])/, { message: "Must include a digit" })
      .regex(/^(?=.*[^\w\s\d])/, {
        message: "Must include a special character",
      })
      .min(6, { message: "Must be at least 6 characters long" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const ChangePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .regex(/^(?=.*[a-z])/, { message: "Must include a lowercase character" })
      .regex(/^(?=.*[A-Z])/, { message: "Must include an uppercase character" })
      .regex(/^(?=.*[0-9])/, { message: "Must include a digit" })
      .regex(/^(?=.*[^\w\s\d])/, {
        message: "Must include a special character",
      })
      .min(6, { message: "Must be at least 6 characters long" }),
    repeatPassword: z
      .string()
      .regex(/^(?=.*[a-z])/, { message: "Must include a lowercase character" })
      .regex(/^(?=.*[A-Z])/, { message: "Must include an uppercase character" })
      .regex(/^(?=.*[0-9])/, { message: "Must include a digit" })
      .regex(/^(?=.*[^\w\s\d])/, {
        message: "Must include a special character",
      })
      .min(6, { message: "Must be at least 6 characters long" }),
  })
  .superRefine(({ repeatPassword, newPassword }, ctx) => {
    if (repeatPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords do not match",
        path: ["repeatPassword"],
      });
    }
  });

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please input a valid email address" })
    .max(50, { message: "Must contain at most 50 characters" }),
  password: z
    .string()
    .min(4, { message: "Must contain at least 4 characters" })
    .max(20, { message: "Must contain at most 20 characters" }),
});
