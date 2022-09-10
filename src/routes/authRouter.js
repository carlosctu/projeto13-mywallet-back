import express from "express";
import * as authController from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/auth/sign-in", authController.signIn);
authRouter.post("/auth/sign-up", authController.signUp);


export default authRouter;
