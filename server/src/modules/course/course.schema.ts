import * as z from "zod";

export const createCourseSchema = z.object({
  code: z.string().min(3, "Course code must be at least 3 characters long"),
  name: z.string().min(2, "Course name must be at least 2 characters long"),
})

export type CreateCourseType = z.infer<typeof createCourseSchema>