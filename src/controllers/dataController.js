import db from "../database/db.js";

async function getUserTransactions(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const session = await db.collection("sessions").findOne({ token });
  if (!session) return res.sendStatus(401);
  const transactions = await db.collection("transactions").find().toArray();
  if (session) {
    const userTransactions = transactions.filter((userTransactions) => {
      userTransactions.userId === session.userID;
    });
    return res.status(200).send(userTransactions);
  }
  res.sendStatus(404);
}

export { getUserTransactions };
