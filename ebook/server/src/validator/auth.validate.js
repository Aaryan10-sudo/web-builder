const Joi = require("joi");

const userSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  hasSubscription: Joi.boolean().default(false),
  subscriptionPlan: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().uuid().required(),
        name: Joi.string().required(),
        price: Joi.number().required(),
        duration: Joi.string().valid("monthly", "yearly").required(),
        features: Joi.array().items(Joi.string()).default([]),
      })
    )
    .default([]),
});

function validateUser(req, res, next) {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}

module.exports = validateUser;
