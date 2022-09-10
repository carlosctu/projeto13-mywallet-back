import joi from "joi";

const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
});
const signInSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

export { signUpSchema, signInSchema };
