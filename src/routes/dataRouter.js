import express from "express";
import * as dataController from "../controllers/dataController.js";
import { sessionValidationMiddleware } from "../middlewares/sessionValidationMiddleware.js";
const dataRouter = express.Router();
dataRouter.get(
  "/transactions",
  sessionValidationMiddleware,
  dataController.getUserTransactions
);
dataRouter.post(
  "/transactions/incomes",
  sessionValidationMiddleware,
  dataController.addTransactionIncome
);
dataRouter.post(
  "/transactions/outcomes",
  sessionValidationMiddleware,
  dataController.addTransactionOutcome
);
export default dataRouter;
