import { v4 as uuidv4 } from "uuid";
import brcypt from "bcrypt";
import db from "../database/db.js";

async function signUp(req, res) {
  const { password } = req.body;

  try {
    const passwordHash = brcypt.hashSync(password, 10);
    await db
      .collection("users")
      .insertOne({ ...req.body, password: passwordHash });
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
  return res.sendStatus(422);
}

async function signIn(req, res) {
  const { email, password } = req.body;
  const user = await db.collection("users").findOne({ email });

  if (!user) return res.sendStatus(404);

  if (user && brcypt.compareSync(password, user.password)) {
    const token = uuidv4();
    try {
      await db.collection("sessions").insertOne({
        userID: user._id,
        token,
      });
      return res.status(201).send({ token: token, name: user.name });
    } catch (error) {
      console.log(error);
    }
  }
  return res.sendStatus(401);
}

export { signUp, signIn };
