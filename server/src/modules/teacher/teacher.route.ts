import {Router} from "express";
import { TeacherController } from "./teacher.controller.js";
import { requireAuth, requireRole } from "../../middleware/requireAuth.js";
import { validateSchema } from "../../middleware/validateSchema.js";
import { createTeacherProfileSchema } from "./teacher.schema.js";

const teacherRouter:Router = Router();
const teacherController = new TeacherController();

teacherRouter.post("/:userId/profile",requireAuth,requireRole(["ADMIN"]), validateSchema(createTeacherProfileSchema),teacherController.createTeacherProfile);
teacherRouter.get("/profile/:userId",requireAuth,requireRole(["ADMIN"]),teacherController.getTeacherProfileById);
teacherRouter.put("/profile/:userId",requireAuth,requireRole(["ADMIN"]), validateSchema(createTeacherProfileSchema.partial()), teacherController.updateTeacherProfile);


export default teacherRouter;