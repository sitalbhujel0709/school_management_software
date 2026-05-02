import {Router} from "express";
import { SubjectController } from "./subject.controller.js";
import { requireAuth, requireRole } from "../../middleware/requireAuth.js";
import { validateSchema } from "../../middleware/validateSchema.js";
import { createSubjectSchema } from "./subject.schema.js";

const subjectRouter: Router = Router();
const subjectController = new SubjectController();

subjectRouter.post("/",requireAuth,requireRole(["ADMIN"]),validateSchema(createSubjectSchema), subjectController.createSubject);
subjectRouter.get("/",requireAuth, subjectController.getAllSubjects);
subjectRouter.get("/:subjectId",requireAuth, subjectController.getSubjectById);
subjectRouter.put("/:subjectId",requireAuth,requireRole(["ADMIN"]), validateSchema(createSubjectSchema.partial()), subjectController.updateSubject);
subjectRouter.delete("/:subjectId",requireAuth,requireRole(["ADMIN"]), subjectController.deleteSubject);

export default subjectRouter;