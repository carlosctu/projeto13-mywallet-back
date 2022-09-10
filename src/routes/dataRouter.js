import express from "express";
import * as dataController from "../controllers/dataController.js";
import { sessionAuthMiddleware } from "../middlewares/authValidationMiddleware.js";
const dataRouter = express.Router();
dataRouter.use(sessionAuthMiddleware);
dataRouter.get("/transactions", dataController.getUserTransactions);
dataRouter.post("/transactions/incomes", dataController.addTransactionIncome);
dataRouter.post("/transactions/outcomes", dataController.addTransactionOutcome);
export default dataRouter;
