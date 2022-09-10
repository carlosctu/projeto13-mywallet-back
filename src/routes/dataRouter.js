import express from "express";
import * as dataController from "../controllers/dataController.js";

const dataRouter = express.Router();
dataRouter.get("/transactions", dataController.getUserTransactions);
export default dataRouter;
