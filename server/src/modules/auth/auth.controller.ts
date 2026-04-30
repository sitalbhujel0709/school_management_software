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
    const result = await this.authService.loginUser(email,password);
    res.cookie("accessToken",result.accessToken,{
      httpOnly:true,
      secure:true,
      sameSite:"lax",
      maxAge:15*60*1000
    });
    res.cookie("refreshToken",result.refreshToken,{
      httpOnly:true,
      secure:true,
      sameSite:"lax",
      maxAge:7*24*60*60*1000
    })
    const {accessToken,refreshToken,...userWithoutTokens} = result;
    res.status(200).json({
      success:true,
      ...userWithoutTokens
    })
  })
}