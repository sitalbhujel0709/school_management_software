import * as z from "zod";

export const createStudentProfileSchema = z.object({
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.coerce.date(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  semester: z.enum(["Fall 2023", "Spring 2024"])
})

export type CreateStudentProfile = z.infer<typeof createStudentProfileSchema>