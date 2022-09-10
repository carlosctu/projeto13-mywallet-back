import express from "express";
import authRouter from "./authRouter.js";
import dataRouter from "./dataRouter.js";
import sessionRouter from "./sessionRouter.js";

const router = express.Router();
router.use(authRouter);
router.use(sessionRouter);
router.use(dataRouter);
export default router;
