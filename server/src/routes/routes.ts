import { Router } from "express";
import authRouter from "../modules/auth/auth.route.js";
import userRouter from "../modules/users/user.route.js";
import studentRouter from "../modules/student/student.route.js";
import teacherRouter from "../modules/teacher/teacher.route.js";
import courseRouter from "../modules/course/course.route.js";
import subjectRouter from "../modules/subjects/subject.route.js";
const router: Router = Router();

router.use("/auth", authRouter );
router.use("/users",userRouter);
router.use("/students", studentRouter);
router.use("/teachers", teacherRouter);
router.use("/courses",courseRouter);
router.use("/subjects", subjectRouter);
export default router;