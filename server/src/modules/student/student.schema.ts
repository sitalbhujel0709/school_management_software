import * as z from "zod";

export const createStudentProfileSchema = z.object({
  DOB: z.coerce.date(),
  contactNumber: z.string(),
  address: z.string(),
  grade: z.string(),
  section: z.string()
})

export type CreateStudentProfile = z.infer<typeof createStudentProfileSchema>