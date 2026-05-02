import {SubjectService} from "./subject.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import type {Request, Response} from "express";

export class SubjectController {
  private subjectService = new SubjectService();

  createSubject = asyncHandler(async (req:Request, res:Response):Promise<void | Response> => {
    const data = req.body;
    const subject = await this.subjectService.createSubject(data);
    res.status(201).json(subject);
  })

  getAllSubjects = asyncHandler(async (req:Request, res:Response):Promise<void | Response> => {
    const subjects = await this.subjectService.getAllSubjects();
    if(subjects.length === 0){
      return res.status(404).json({message: "No subjects found"});
    }
    res.status(200).json(subjects);
  })
  getSubjectById = asyncHandler(async (req:Request, res:Response):Promise<void | Response> => {
    const subjectId = req.params.subjectId;
    const subject = await this.subjectService.getSubjectById(subjectId as string);
    res.status(200).json(subject);
  })

  updateSubject = asyncHandler(async (req:Request, res:Response):Promise<void | Response> => {
    const subjectId = req.params.subjectId;
    const data = req.body;
    const updatedSubject = await this.subjectService.updateSubject(subjectId as string, data);
    res.status(200).json(updatedSubject);
  })
  deleteSubject = asyncHandler(async (req:Request, res:Response):Promise<void | Response> => {
    const subjectId = req.params.subjectId;
    await this.subjectService.deleteSubject(subjectId as string);
    res.status(204).send({
        success: true,
        message: "Subject deleted successfully"
    });
  })
}