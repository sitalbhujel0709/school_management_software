import {Router} from "express";
import { AuthController } from "./auth.controller.js";
import { validateSchema } from "../../middleware/validateSchema.js";
import { createUserSchema, LoginUserSchema, verifyEmailSchema } from "./auth.schema.js";

const authRouter:Router = Router();
const authController = new AuthController();
authRouter.post("/register",validateSchema(createUserSchema), authController.registerUser);
authRouter.post("/login",validateSchema(LoginUserSchema
), authController.loginUser);
authRouter.post("/verify-email", validateSchema(verifyEmailSchema), authController.verifyEmail);

export default authRouter;