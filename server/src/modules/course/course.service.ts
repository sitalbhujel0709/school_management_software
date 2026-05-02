import { prisma } from "../../config/prisma.js";
import type { Course } from "../../generated/prisma/client.js";
import { AppError } from "../../utils/AppError.js";
import type { CreateCourseType } from "./course.schema.js";

export class CourseService {
  private prisma = prisma;

  async createCourse(data:CreateCourseType):Promise<Course>{
    const existingCourse = await this.prisma.course.findUnique({
      where: {
        code: data.code
      }
    });
    if(existingCourse){
      throw new AppError(400, "Course with this code already exists");
    }
    const course = await this.prisma.course.create({
      data
    })

    return course;
  }
  async getAllCourses():Promise<Course[]>{
    const courses = await this.prisma.course.findMany();
    return courses
  };
  async getCourseById(courseId:string):Promise<Course>{
    const course = await this.prisma.course.findUnique({
      where:{
        id: courseId
      }
    })
    if(!course){
      throw new AppError(404, "Course not found");
    }
    return course;
  }

  async updateCourse(courseId:string,data:Partial<CreateCourseType>):Promise<Course>{
    const existingCourse = await this.prisma.course.findUnique({
      where:{
        id: courseId
      }
    });
    if(!existingCourse){
      throw new AppError(404, "Course not found");
    }
    const course = await this.prisma.course.update({
      where:{
        id: courseId
      },
      data
    });
    return course;
  }
  async deleteCourse(courseId:string):Promise<void>{
    const existingCourse = await this.prisma.course.findUnique({
      where:{
        id: courseId
      }
    });
    if(!existingCourse){
      throw new AppError(404, "Course not found");
    }
    await this.prisma.course.delete({
      where:{
        id: courseId
      }
    });
  }
}