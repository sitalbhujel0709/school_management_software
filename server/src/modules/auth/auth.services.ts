import { prisma } from "../../config/prisma.js";
import type { User } from "../../generated/prisma/client.js";
import { generateAccessToken } from "../../utils/jwt.js";
import { createUserSchema, type loginUserResponse } from "./auth.schema.js";
import bcrypt from "bcrypt";


export class AuthService {
  private prisma = prisma;

  async createUser(data: createUserSchema):Promise<Omit<User,"password">> {

    const existingUser = await this.prisma.user.findUnique({
      where:{
        email:data.email
      }
    })

    if(existingUser){
      throw new Error("User with this email already exists")
    }

    const hashedPassword =  await bcrypt.hash(data.password,10);
    const user = await this.prisma.user.create({
      data:{
        name:data.name,
        email:data.email,
        password:hashedPassword,
        role:data.role
      }
    })

    const {password,...userWithoutPassword} = user;
    return userWithoutPassword;
  }

  async loginUser(email:string,password:string):Promise<loginUserResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })
    if(!user){
      throw new Error("User not found. please check your email and try again")
    }
    const isPasswordValid = await bcrypt.compare(password,user.password!);
    if(!isPasswordValid){
      throw new Error("Invalid password. please check your password and try again")
    }
    const {password:_,...userWithoutPassword} = user;
    const accessToken = generateAccessToken({userId:user.id,role:user.role});
    const refreshToken = generateAccessToken({userId:user.id,role:user.role});

    return {
      user:userWithoutPassword,
      accessToken,
      refreshToken
    }
  }
}