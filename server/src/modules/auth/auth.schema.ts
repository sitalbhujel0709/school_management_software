import * as z from "zod";
import type { User } from "../../generated/prisma/client.js";

export const createUserSchema = z.object({
  name: z.string().min(3,"Name must be at least 3 characters long").max(100,"Name must be at most 100 characters long"),
  email:z.string().email("Invalid email address"),
  password:z.string().min(8,"Password must be at least 8 characters long").regex(/[A-Z]/,"Password must contain at least one uppercase letter").regex(/[a-z]/,"Password must contain at least one lowercase letter").regex(/[0-9]/,"Password must contain at least one number").regex(/[@$!%*?&]/,"Password must contain at least one special character"),
  role:z.enum(["TEACHER","STUDENT"],"Role must be either TEACHER, or STUDENT").default("STUDENT")
})

export const LoginUserSchema = z.object({
  email:z.string().email("Invalid email address"),
  password:z.string().min(8,"Password must be at least 8 characters long").regex(/[A-Z]/,"Password must contain at least one uppercase letter").regex(/[a-z]/,"Password must contain at least one lowercase letter").regex(/[0-9]/,"Password must contain at least one number").regex(/[@$!%*?&]/,"Password must contain at least one special character")
})

export const verifyEmailSchema = z.object({
  email:z.string().email("Invalid email address"),
  otp:z.string().length(6,"OTP must be 6 digits long")
})

export interface loginUserResponse {
  user: Omit<User,"passwordHash">;
  accessToken:string;
  refreshToken:string;
}

export type createUserSchema = z.infer<typeof createUserSchema>;
export type verifyEmailSchema = z.infer<typeof verifyEmailSchema>;