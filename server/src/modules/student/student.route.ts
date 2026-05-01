import { Router } from "express";
import { StudentController } from "./student.controller.js";
import { requireAuth, requireRole } from "../../middleware/requireAuth.js";
import { validateSchema } from "../../middleware/validateSchema.js";
import { createStudentProfileSchema } from "./student.schema.js";

const studentRouter:Router = Router();
const studentController = new StudentController();

studentRouter.post("/:userId/profile",requireAuth, requireRole(["ADMIN"]),validateSchema(createStudentProfileSchema), studentController.createStudentProfile);
studentRouter.get("/profile",requireAuth, requireRole(["STUDENT"]), studentController.getStudentProfile);
studentRouter.get("/profile/:id",requireAuth, requireRole(["ADMIN"]), studentController.getStudentProfileById);
studentRouter.put("/profile/:id",requireAuth, requireRole(["ADMIN"]), studentController.updateStudentProfile);

export default studentRouter;