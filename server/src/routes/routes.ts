import { Router } from "express";
import authRouter from "../modules/auth/auth.route.js";
import userRouter from "../modules/users/user.route.js";
const router: Router = Router();

router.use("/auth", authRouter );
router.use("/users",userRouter);
export default router;