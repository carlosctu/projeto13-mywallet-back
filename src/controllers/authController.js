import { v4 as uuidv4 } from "uuid";
import brcypt from "bcrypt";
import db from "../database/db.js";
import * as authSchema from "../schemas/authSchemas.js";

async function signUp(req, res) {
  const { name, password, email } = req.body;
  const validation = authSchema.signUpSchema.validate(req.body, {
    abortEarly: false,
  });
  const userExists = await db.collection("users").findOne({ email: email });
  //#region Fast Fail
  if (validation.error) {
    const errors = validation.error.details.map((errors) => errors.message);
    return res.status(422).send(errors);
  }
  if (userExists) return res.sendStatus(409);
  //#endregion
  //#region Sending data to Users Collection
  try {
    const passwordHash = brcypt.hashSync(password, 10);
    await db
      .collection("users")
      .insertOne({ ...req.body, password: passwordHash });
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
  //#endregion
  return res.sendStatus(422);
}

async function signIn(req, res) {
  const { email, password } = req.body;
  const validation = authSchema.signInSchema.validate(req.body, {
    abortEarly: false,
  });
  const user = await db.collection("users").findOne({ email });
  //#region FastFail
  if (validation.error) {
    const errors = validation.error.details.map((errors) => errors.message);
    return res.status(422).send(errors);
  }
  if (!user) return res.sendStatus(404);
  //#endregion
  if (user && brcypt.compareSync(password, user.password)) {
    const token = uuidv4();
    try {
      await db.collection("sessions").insertOne({
        userID: user._id,
        token,
      });
      return res.status(201).send(token);
    } catch (error) {
      console.log(error);
    }
  }
  return res.sendStatus(401);
}

export { signUp, signIn };
