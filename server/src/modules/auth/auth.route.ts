import {Router} from "express";
import { AuthController } from "./auth.controller.js";
import { validateSchema } from "../../middleware/validateSchema.js";
import { createUserSchema, LoginUserSchema, verifyEmailSchema } from "./auth.schema.js";
import { requireAuth } from "../../middleware/requireAuth.js";

const authRouter:Router = Router();
const authController = new AuthController();
authRouter.post("/register",validateSchema(createUserSchema), authController.registerUser);
authRouter.post("/login",validateSchema(LoginUserSchema
), authController.loginUser);
authRouter.post("/verify-email", validateSchema(verifyEmailSchema), authController.verifyEmail);
authRouter.post("/logout",requireAuth, authController.logoutUser);

export default authRouter;