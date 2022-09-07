import cors from "cors";
import dotenv from "dotenv";
import joi from "joi";
import express, { application } from "express";
import { v4 as uuidv4 } from "uuid";
import { MongoClient } from "mongodb";
import brcypt from "bcrypt";

//#region Backend Configuration
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
let db;
const mongoClient = new MongoClient(process.env.MONGO_URI);
mongoClient.connect().then(() => (db = mongoClient.db("mywallet")));
//#endregion

//#region Schemas
const logonSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});
const registerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
});
//#endregion

//#region Endpoints
app.post("/register", async (req, res) => {
  const { name, password, email } = req.body;
  const validation = registerSchema.validate(req.body, { abortEarly: false });
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
});
app.post("/logon", async (req, res) => {
  const { email, password } = req.body;
  const validation = logonSchema.validate(req.body, { abortEarly: false });
  const user = await db.collection("users").findOne({ email });
  //#region FastFail
  if (validation.error) {
    const errors = validation.error.details.map((errors) => errors.message);
    return res.status(422).send(errors);
  }
  if (user && brcypt.compareSync(password, user.password)) {
    const token = uuidv4();
    await db.collection("sessions").insertOne({
      userID: user._id,
      token,
    });
    res.status(201).send(token);
  } else {
    return res.sendStatus(404);
  }
  //#endregion FastFail
});
app.get("/transactions", async (req, res) => {
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
});
//#endregion

app.listen(5000, () => {
  console.log("Magic happens on port 5000");
});
