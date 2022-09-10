import db from "../database/db.js";

async function logOutSession(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(404);
  try {
    const userDeleted = await db.collection("sessions").deleteOne({
      token: token,
    });
    if (userDeleted.deletedCount === 1) {
      return res.status(200).send({ Message: "token deleted" });
    }
    return res.sendStatus(404);
  } catch (error) {
    console.log(error);
  }
  return res.sendStatus(404);
}

export { logOutSession };
