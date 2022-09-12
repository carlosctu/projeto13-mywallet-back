import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import db from "../database/db.js";

async function getUserTransactions(req, res) {
  const session = res.locals.session;

  try {
    const userTransactions = await db
      .collection("transactions")
      .find({ userID: ObjectId(session.userID) })
      .toArray();
    return res.status(200).send(userTransactions);
  } catch (error) {
    console.log(error);
  }
  res.sendStatus(404);
}
async function deleteUserTransaction(req, res) {
  const { id } = req.params;
  try {
    const userTransactions = await db
      .collection("transactions")
      .deleteOne({ _id: ObjectId(id) });
    if (userTransactions.deletedCount === 1) {
      return res.status(200).send(userTransactions);
    }
    return res.sendStatus(404);
  } catch (error) {
    console.log(error);
  }
  res.sendStatus(404);
}

async function addTransactionIncome(req, res) {
  const session = res.locals.session;

  try {
    await db.collection("transactions").insertOne({
      userID: session.userID,
      date: dayjs(Date.now()).format("DD/MM"),
      type: "income",
      ...req.body,
    });
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
  res.sendStatus(404);
}
async function addTransactionOutcome(req, res) {
  const session = res.locals.session;

  try {
    await db.collection("transactions").insertOne({
      userID: session.userID,
      date: dayjs(Date.now()).format("DD/MM"),
      type: "outcome",
      ...req.body,
    });
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
  res.sendStatus(404);
}

export {
  getUserTransactions,
  deleteUserTransaction,
  addTransactionIncome,
  addTransactionOutcome,
};
