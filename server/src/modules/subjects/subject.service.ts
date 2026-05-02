import { prisma } from "../../config/prisma.js";
import type { Subject } from "../../generated/prisma/client.js";
import type { CreateSubjectType } from "./subject.schema.js";

export class SubjectService {
  private prisma = prisma;

  async createSubject(data: CreateSubjectType): Promise<Subject> {
    const existingSubject = await this.prisma.subject.findUnique({
      where: {
        code: data.code
      }
    });

    if (existingSubject) {
      throw new Error("Subject with this code already exists");
    }

    return await this.prisma.subject.create({
      data: {
        code: data.code,
        name: data.name,
        course: { connect: { id: data.courseId } }
      }
    });
  }

  async getAllSubjects(): Promise<Subject[]> {
    const subjects = await this.prisma.subject.findMany();
    return subjects;
  }
  async getSubjectById(subjectId: string): Promise<Subject> {
    const subject = await this.prisma.subject.findUnique({
      where: {
        id: subjectId
      }
    })
    if (!subject) {
      throw new Error("Subject not found");
    }
    return subject;
  }

  async updateSubject(subjectId: string, data: Partial<CreateSubjectType>): Promise<Subject> {
    const existingSubject = await this.prisma.subject.findUnique({
      where: {
        id: subjectId
      }
    });
    if (!existingSubject) {
      throw new Error("Subject not found");
    }
    return await this.prisma.subject.update({
      where: {
        id: subjectId
      },
      data
    }
    );
  }
  async deleteSubject(subjectId: string): Promise<void> {
    const existingSubject = await this.prisma.subject.findUnique({
      where: {
        id: subjectId
      }
    });
    if (!existingSubject) {
      throw new Error("Subject not found");
    }
    await this.prisma.subject.delete({
      where: {
        id: subjectId
      }
    });
  }
}