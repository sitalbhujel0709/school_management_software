import { prisma } from "../../config/prisma.js";
import type { StudentProfile } from "../../generated/prisma/client.js";
import type { CreateStudentProfile } from "./student.schema.js";

export class StudentService {
  private prisma = prisma;

  async createStudentProfile(userId:string,data:CreateStudentProfile):Promise<StudentProfile>{
    const existingProfile = await this.prisma.studentProfile.findUnique({
      where:{
        userId
      }
    });
    if(existingProfile){
      throw new Error("Student profile already exists for this user");
    }
    const course = await this.prisma.course.findUnique({
      where:{
        code: data.courseCode
      }
    })
    if(!course){
      throw new Error("Course not found with the provided course code");
    }
    const {courseCode, ...studentData} = data;
    const studentInputData = {
      userId,
      ...studentData,
      courseId: course.id
    }
    const studentProfile = await this.prisma.studentProfile.create({
      data:studentInputData
    })
    if(!studentProfile){
      throw new Error("Failed to create student profile");
    }
    return studentProfile;
  }

  async getStudentProfile(userId:string):Promise<StudentProfile>{
    const studentProfile = await this.prisma.studentProfile.findUnique({
      where:{
        userId
      }
    })
    if(!studentProfile){
      throw new Error("Student profile not found");
    }
    return studentProfile;
  }

  async getStudentProfileById(profileId:string):Promise<StudentProfile>{
    const studentProfile = await this.prisma.studentProfile.findUnique({
      where:{
        id: profileId}
    })
    if(!studentProfile){
      throw new Error("Student profile not found");
    }
    return studentProfile;
  }

  async updateStudentProfile(profileId:string, data:Partial<Omit<StudentProfile, "id" | "userId">>):Promise<StudentProfile>{
    const studentProfile = await this.prisma.studentProfile.findUnique({
      where: {
        id: profileId
      }
    })
    if(!studentProfile){
      throw new Error("Student profile not found");
    }
    const updatedProfile = await this.prisma.studentProfile.update({
      where: {
        id: profileId
      },
      data
    })
    if(!updatedProfile){
      throw new Error("Failed to update student profile");
    }
    return updatedProfile;
  }
}