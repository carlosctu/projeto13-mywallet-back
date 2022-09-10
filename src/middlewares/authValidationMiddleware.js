import db from "../database/db.js";
export async function sessionAuthMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const session = await db.collection("sessions").findOne({ token });
  if (!session) return res.sendStatus(401);

  res.locals.session = session;
  //Pasa para o Controller
  next();
}
