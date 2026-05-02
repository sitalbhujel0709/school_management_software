import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/requireAuth.js";
import { CourseController } from "./course.controller.js";
import { validateSchema } from "../../middleware/validateSchema.js";
import { createCourseSchema } from "./course.schema.js";


const courseRouter: Router = Router();
const courseController = new CourseController();

courseRouter.post("/",requireAuth,requireRole(["ADMIN"]),validateSchema(createCourseSchema), courseController.createCourse);
courseRouter.get("/",requireAuth,courseController.getAllCourses);
courseRouter.get("/:courseId",requireAuth,courseController.getCourseById);
courseRouter.put("/:courseId",requireAuth,requireRole(["ADMIN"]),validateSchema(createCourseSchema.partial()), courseController.updateCourse);
courseRouter.delete("/:courseId",requireAuth,requireRole(["ADMIN"]), courseController.deleteCourse);

export default courseRouter;