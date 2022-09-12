import db from "../database/db.js";
import * as dataSchema from "../schemas/dataSchemas.js";

async function schemaSessionValidationMiddleware(req, res, next) {
  const validation = dataSchema.transactionSchema.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error) {
    const errors = validation.error.details.map((errors) => errors.message);
    return res.status(422).send(errors);
  }
  next();
}

async function sessionTokenValidationMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const session = await db.collection("sessions").findOne({ token });
  if (!session) return res.sendStatus(401);

  res.locals.session = session;
  //Pasa para o Controller
  next();
}

export { schemaSessionValidationMiddleware, sessionTokenValidationMiddleware };
