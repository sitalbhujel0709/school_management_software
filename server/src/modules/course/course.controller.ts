import { asyncHandler } from "../../utils/asyncHandler.js";
import { CourseService } from "./course.service.js";
import type {Request, Response} from "express";

export class CourseController {
  private courseService = new CourseService();

  createCourse = asyncHandler(async (req:Request, res:Response):Promise<void | Response> => {
    const data = req.body;
    const course = await this.courseService.createCourse(data);
    res.status(201).json(course);
  })

  getAllCourses = asyncHandler(async (req:Request, res:Response):Promise<void | Response> => {
    const courses = await this.courseService.getAllCourses();
    if(courses.length === 0){
      return res.status(404).json({message: "No courses found"});
    }
    res.status(200).json(courses);
  })

  getCourseById = asyncHandler(async (req:Request, res:Response):Promise<void | Response> => {
    const courseId = req.params.courseId;
    const course = await this.courseService.getCourseById(courseId as string);
    res.status(200).json(course);
  })

  updateCourse = asyncHandler(async (req:Request, res:Response):Promise<void | Response> => {
    const courseId = req.params.courseId;
    const data = req.body;
    const updatedCourse = await this.courseService.updateCourse(courseId as string, data);
    res.status(200).json(updatedCourse);
  })

  deleteCourse = asyncHandler(async (req:Request, res:Response):Promise<void | Response> => {
    const courseId = req.params.courseId;
    await this.courseService.deleteCourse(courseId as string);
    res.status(204).send();
  })
}