import type { requiredAuthRequest } from "../../middleware/requireAuth.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { UserService } from "./user.service.js";
import type {Request, Response} from "express";

export class UserController {
  private userService = new UserService();

  getUserProfile = asyncHandler(async (req:requiredAuthRequest,res:Response):Promise<void | Response>=>{
    const userId = req.user?.userId as string;
    const userProfile = await this.userService.getUserProfile(userId);
    if(!userProfile){
      return res.status(404).json({message:"User not found"});
    }
    res.status(200).json({user: userProfile});
  })

  getUserById = asyncHandler(async (req:Request,res:Response):Promise<void | Response>=>{
    const userId = req.params.id;
    if(!userId){
      return res.status(400).json({message:"User ID is required"});
    }
    const user = await this.userService.getUserById(userId as string);
    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    res.status(200).json({success:true,user});
  })

  getAllUsers = asyncHandler(async (req:Request,res:Response):Promise<void | Response>=>{
    const users = await this.userService.getAllUsers();
    if(users.length === 0){
      return res.status(404).json({message:"No users found"});
    }
    res.status(200).json({success:true,users});
  })

  updateUser = asyncHandler(async (req:Request,res:Response):Promise<void | Response>=>{
    const userId = req.params.id;
    if(!userId){
      return res.status(400).json({message:"User ID is required"});
    }
    const userData = req.body;
    const updatedUser = await this.userService.updateUser(userId as string, userData);
    res.status(200).json({success:true,user: updatedUser});
  })

  deleteUser = asyncHandler(async (req:Request,res:Response):Promise<void | Response>=>{
    const userId = req.params.id;
    if(!userId){
      return res.status(400).json({message:"User ID is required"});
    }
    await this.userService.deleteUser(userId as string);
    res.status(200).json({success:true,message:"User deleted successfully"});
  })

  updateUserAvatar = asyncHandler(async (req:requiredAuthRequest, res:Response):Promise<void | Response> => {
    const userId = req.user?.userId as string;
    if(!userId){
      return res.status(400).json({message:"User ID is required"});
    }
    if(!req.file){
      return res.status(400).json({message:"Avatar file is required"});
    }
    const updatedUser = await this.userService.updateUserAvatar(userId, req.file.buffer);
    res.status(200).json({success:true,user: updatedUser});
  })
}