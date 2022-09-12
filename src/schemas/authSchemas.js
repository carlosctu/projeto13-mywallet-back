import joi from "joi";

const signUpSchema = joi.object({
  name: joi.string().min(1).required(),
  email: joi.string().min(8).required(),
  password: joi.string().min(6).required(),
});
const signInSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

export { signUpSchema, signInSchema };
