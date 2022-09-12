import express from "express";
import * as dataController from "../controllers/dataController.js";
import * as sessionMiddleware from "../middlewares/sessionValidationMiddleware.js";

const dataRouter = express.Router();

dataRouter.get(
  "/transactions",
  sessionMiddleware.sessionTokenValidationMiddleware,
  dataController.getUserTransactions
);
dataRouter.delete(
  "/transactions/:id",
  sessionMiddleware.sessionTokenValidationMiddleware,
  dataController.deleteUserTransaction
);
dataRouter.post(
  "/transactions/incomes",
  sessionMiddleware.schemaSessionValidationMiddleware,
  sessionMiddleware.sessionTokenValidationMiddleware,
  dataController.addTransactionIncome
);
dataRouter.post(
  "/transactions/outcomes",
  sessionMiddleware.schemaSessionValidationMiddleware,
  sessionMiddleware.sessionTokenValidationMiddleware,
  dataController.addTransactionOutcome
);

export default dataRouter;
