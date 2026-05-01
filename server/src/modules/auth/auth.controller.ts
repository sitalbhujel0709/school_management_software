import config from "../../config/config.js";
import type { requiredAuthRequest } from "../../middleware/requireAuth.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AuthService } from "./auth.services.js";
import type {Request, Response, NextFunction} from "express";

export class AuthController {
  private authService = new AuthService();

  registerUser = asyncHandler( async (req:Request, res:Response) => {
    const data = req.body;
    const user = await this.authService.createUser(data);
    res.status(201).json({
      success:true,
      user
    })
  });
  loginUser = asyncHandler(async (req:Request, res:Response) => {
    const {email,password} = req.body;
    const result = await this.authService.loginUser(email,password,req);
    const isProduction = config.nodeEnv === 'production';
    res.cookie("accessToken",result.accessToken,{
      httpOnly:true,
      secure:isProduction,
      sameSite:"lax",
      maxAge:15*60*1000
    });
    res.cookie("refreshToken",result.refreshToken,{
      httpOnly:true,
      secure:isProduction,
      sameSite:"lax",
      maxAge:7*24*60*60*1000
    })
    const {accessToken,refreshToken,...userWithoutTokens} = result;
    res.status(200).json({
      success:true,
      ...userWithoutTokens
    })
  })

  verifyEmail = asyncHandler(async (req:Request, res:Response) => {
    const {email,otp} = req.body;
    await this.authService.verifyEmail(email,otp);
    res.status(200).json({
      success:true,
      message:"Email verified successfully"
    })
  })

  logoutUser = asyncHandler(async (req:requiredAuthRequest, res:Response)=>{
    const userId = req.user?.userId as string;
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
      return res.status(400).json({message:"Refresh token is required"});
    }
    await this.authService.logoutUser(userId, refreshToken);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({
      success:true,
      message:"Logged out successfully"
    })
  })

  logoutAllsessions = asyncHandler(async (req:requiredAuthRequest, res:Response)=>{
    const userId = req.user?.userId as string;
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
      return res.status(400).json({message:"Refresh token is required"});
    }
    await this.authService.logoutAllsessions(userId, refreshToken);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({
      success:true,
      message:"Logged out of all sessions successfully"
    })
  })
}