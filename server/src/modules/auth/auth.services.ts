import { prisma } from "../../config/prisma.js";
import type { User } from "../../generated/prisma/client.js";
import { sendEmail } from "../../utils/emailService.js";
import { generateAccessToken } from "../../utils/jwt.js";
import { createUserSchema, type loginUserResponse } from "./auth.schema.js";
import bcrypt from "bcrypt";


export class AuthService {
  private prisma = prisma;

  async createUser(data: createUserSchema): Promise<Omit<User, "password">> {

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email
      }
    })

    if (existingUser) {
      throw new Error("User with this email already exists")
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role
      }
    })

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = await bcrypt.hash(otp, 10);

    await this.prisma.otp.create({
      data: {
        email: data.email,
        code: hashedOTP,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // OTP expires in 5 minutes
      }
    })

    await sendEmail(data.email, "Verify your email", "Your OTP code is: " + otp);

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async loginUser(email: string, password: string): Promise<loginUserResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!user) {
      throw new Error("User not found. please check your email and try again")
    }
    if(!user.isVerified){
      throw new Error("Email not verified. Please verify your email before logging in")
    }
    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      throw new Error("Invalid password. please check your password and try again")
    }
    const { password: _, ...userWithoutPassword } = user;
    const accessToken = generateAccessToken({ userId: user.id, role: user.role });
    const refreshToken = generateAccessToken({ userId: user.id, role: user.role });

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken
    }
  }

  async verifyEmail(email: string, otp: string): Promise<void> {
    const otpRecord = await this.prisma.otp.findFirst({
      where: {
        email,
        revoked: false
      }
    })

    if (!otpRecord) {
      throw new Error("OTP not found. Please request a new OTP and try again")
    }
    if (otpRecord.expiresAt < new Date()) {
      throw new Error("OTP has expired. Please request a new OTP and try again")
    }
    const isOTPValid = await bcrypt.compare(otp, otpRecord.code);
    if (!isOTPValid) {
      throw new Error("Invalid OTP. Please check your OTP and try again")
    }

    await this.prisma.$transaction(async (tx) => {

      await tx.user.update({
        where: {
          email
        },
        data: {
          isVerified: true
        }
      })
      await tx.otp.update({
        where: {
          id: otpRecord.id
        },
        data: {
          revoked: true
        }
      })
    })
  }
}