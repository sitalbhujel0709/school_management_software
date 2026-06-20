import type { requiredAuthRequest } from "../../middleware/requireAuth.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { StudentService } from "./student.service.js";
import type {Request, Response} from "express";

export class StudentController {
  private studentService = new StudentService();

  createStudentProfile = asyncHandler( async (req: Request, res:Response):Promise<void | Response> => {

    const data = req.body;
    const studentProfile = await this.studentService.createStudentProfile( data);
    res.status(201).json({success:true, studentProfile});
  })

  getStudentProfile = asyncHandler(async(req:requiredAuthRequest, res:Response):Promise<void | Response>=> {
    const userId = req.user?.userId as string;
    const studentProfile = await this.studentService.getStudentProfile(userId);
    if(!studentProfile){
      return res.status(404).json({message:"Student profile not found"});
    }
    res.status(200).json({success:true, studentProfile});
  })

  getStudentProfileById = asyncHandler(async(req:Request, res:Response):Promise<void | Response>=> {
    const profileId = req.params.id;
    if(!profileId){
      return res.status(400).json({message:"Profile ID is required"});
    }
    const studentProfile = await this.studentService.getStudentProfileById(profileId as string);
    if(!studentProfile){
      return res.status(404).json({message:"Student profile not found"});
    }
    res.status(200).json({success:true, studentProfile});
  })

  updateStudentProfile = asyncHandler(async(req:Request, res:Response):Promise<void | Response>=> {
    const profileId = req.params.id;
    if(!profileId){
      return res.status(400).json({message:"Profile ID is required"});
    }
    const data = req.body;
    const studentProfile = await this.studentService.updateStudentProfile(profileId as string, data);
    res.status(200).json({success:true, studentProfile});
  })
}