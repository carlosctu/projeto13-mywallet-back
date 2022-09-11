import express from "express";
import * as authController from "../controllers/authController.js";
import { authValidationMiddlewarre } from "../middlewares/authValidationMiddleware.js";

const authRouter = express.Router();

authRouter.post(
  "/auth/sign-in",
  authValidationMiddlewarre,
  authController.signIn
);
authRouter.post(
  "/auth/sign-up",
  authValidationMiddlewarre,
  authController.signUp
);

export default authRouter;
