import express from "express";
import * as sessionController from "../controllers/sessionController.js";

const sessionRouter = express.Router();

sessionRouter.delete("/session/log-out", sessionController.logOutSession);

export default sessionRouter;
