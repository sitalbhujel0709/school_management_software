import jwt from "jsonwebtoken";
import config from "../config/config.js";

interface JwtPayload{
  userId: number;
  role: "ADMIN" | "TEACHER" | "STUDENT";
}

export const generateAccessToken = (payload:JwtPayload) => {
  return jwt.sign(payload,config.accessTokenSecret,{
    expiresIn: "1d"
  })
}

export const generateRefreshToken = (payload:JwtPayload) => {
  return jwt.sign(payload,config.refreshTokenSecret,{
    expiresIn: "7d"
  })
}

export const verifyAccessToken = (token:string):JwtPayload => {
  try {
    return jwt.verify(token,config.accessTokenSecret) as JwtPayload;
  } catch (error) {
    throw new Error("Invalid access token");
  }
}

export const verifyRefreshToken = (token:string):JwtPayload => {
  try {
    return jwt.verify(token,config.refreshTokenSecret) as JwtPayload;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
}