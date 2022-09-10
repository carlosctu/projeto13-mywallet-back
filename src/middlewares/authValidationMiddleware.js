import db from "../database/db.js";
async function authMiddleware(req, res, next) {
  const userExists = await db.collection("users").findOne({ email: email });
  if (userExists) return res.sendStatus(409);
  
}
