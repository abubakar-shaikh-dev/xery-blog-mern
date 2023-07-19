import express from "express";

//controllers
import * as userController from "../controllers/user-controller.js";

//Middlewares
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = express.Router();

//Public
router.get("/username/:username",userController.getUserByUsername);

//Auth
router.post("/register", userController.register);
router.post("/login",userController.login);
router.post("/refreshToken",userController.refreshToken)

//Protected
router.get("/",verifyToken,userController.user);
router.put("/",verifyToken,userController.updateUser);
router.get("/all",verifyToken, userController.getAllUsers);

export default router;