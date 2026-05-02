import { prisma } from "../../config/prisma.js";
import type { TeacherProfile } from "../../generated/prisma/client.js";
import type { CreateTeacherProfile } from "./teacher.schema.js";

export class TeacherService {

  private prisma = prisma;

  async createTeacherProfile(userId:string,data:CreateTeacherProfile):Promise<TeacherProfile>{
    const existingProfile = await this.prisma.teacherProfile.findUnique({
      where:{
        userId
      }
    });
    if(existingProfile){
      throw new Error("Teacher profile already exists for this user");
    }
    const subject = await this.prisma.subject.findUnique({
      where:{
        code: data.subjectCode
      }
    });
    if(!subject){
      throw new Error("Subject not found");
    }
    const { subjectCode, ...teacherData } = data;
    const teacherInputData = {
      userId,
      ...teacherData,
      subjectId: subject.id
    }
    const teacherProfile = await this.prisma.teacherProfile.create({
      data:teacherInputData
    });
    return teacherProfile;
  }

  async getTeacherById(profileId:string):Promise<TeacherProfile>{
    const teacherProfile = await this.prisma.teacherProfile.findUnique({
      where:{
        userId: profileId
      }
    })
    if(!teacherProfile){
      throw new Error("Teacher profile not found");
    }
    return teacherProfile;
  }
  async updateTeacherProfile(profileId:string,data:Partial<CreateTeacherProfile>):Promise<TeacherProfile>{
    const existingProfile = await this.prisma.teacherProfile.findUnique({
      where:{
        userId: profileId
      }
    })
    if(!existingProfile){
      throw new Error("Teacher profile not found");
    }
    const updatedProfile = await this.prisma.teacherProfile.update({
      where:{
        userId: profileId
      },
      data
    })
    return updatedProfile;
  }
}