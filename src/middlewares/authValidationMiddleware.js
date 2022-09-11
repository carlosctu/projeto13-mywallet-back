import db from "../database/db.js";
import * as authSchema from "../schemas/authSchemas.js";

export async function authValidationMiddlewarre(req, res, next) {
  let validation;
  const { email } = req.body;
  const userExists = await db.collection("users").findOne({ email });

  if (Object.keys(req.body).length === 3) {
    if (userExists) return res.sendStatus(409);
    validation = authSchema.signUpSchema.validate(req.body, {
      abortEarly: false,
    });
  } else {
    validation = authSchema.signInSchema.validate(req.body, {
      abortEarly: false,
    });
  }

  if (validation.error) {
    const errors = validation.error.details.map((errors) => errors.message);
    return res.status(422).send(errors);
  }

  next();
}
