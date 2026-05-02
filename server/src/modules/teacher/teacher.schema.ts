
import * as z from "zod";

export const createTeacherProfileSchema = z.object({
  DOB: z.coerce.date(),
  contactNumber: z.string(),
  address: z.string(),
  subjectCode: z.string()
})

export type CreateTeacherProfile = z.infer<typeof createTeacherProfileSchema>