import * as z from "zod";

export const createSubjectSchema = z.object({
  code: z.string().min(3, "Subject code must be at least 3 characters long"),
  name: z.string().min(2, "Subject name must be at least 2 characters long"),
  courseId: z.string().min(1, "Course is required"),
})

export type CreateSubjectType = z.infer<typeof createSubjectSchema>