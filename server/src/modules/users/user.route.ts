import {Router} from "express";
import {UserController} from './user.controller.js';
import {requireAuth, requireRole} from '../../middleware/requireAuth.js';
import { upload } from "../../config/multer.js";

const userRouter: Router = Router();
const userController = new UserController();

userRouter.get("/profile", requireAuth, userController.getUserProfile);
userRouter.get("/:id", requireAuth, requireRole(["ADMIN"]), userController.getUserById);
userRouter.get("/", requireAuth, requireRole(["ADMIN"]), userController.getAllUsers);
userRouter.put("/avatar", requireAuth, upload.single("avatar"), userController.updateUserAvatar);
userRouter.put("/:id", requireAuth, requireRole(["ADMIN"]), userController.updateUser);
userRouter.delete("/:id", requireAuth, requireRole(["ADMIN"]), userController.deleteUser);
export default userRouter;