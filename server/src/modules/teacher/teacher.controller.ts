import { asyncHandler } from "../../utils/asyncHandler.js";
import { TeacherService } from "./teacher.service.js";
import type {Request, Response} from "express";

export class TeacherController {
  private teacherService = new TeacherService();

  createTeacherProfile = asyncHandler(async (req:Request, res:Response) => {
    const userId = req.params.userId;
    const data = req.body;
    const teacherProfile = await this.teacherService.createTeacherProfile(userId as string, data);
    res.status(201).json(teacherProfile);
  });

  getTeacherProfileById = asyncHandler(async (req:Request, res:Response) => {
    const profileId = req.params.userId;
    const teacherProfile = await this.teacherService.getTeacherById(profileId as string);
    res.status(200).json(teacherProfile);
  })

  updateTeacherProfile = asyncHandler(async (req:Request, res:Response) => {
    const profileId = req.params.userId;
    const data = req.body;
    const updatedProfile = await this.teacherService.updateTeacherProfile(profileId as string, data);
    res.status(200).json(updatedProfile);
  });
}