const Joi = require("joi");

const bookSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  author: Joi.string().required(),
  publishedYear: Joi.number().integer().required(),
  coverPage: Joi.string().uri().required(),
  genre: Joi.string().required(),
  pdfFileUrl: Joi.string().uri().required(),
});

function validateBook(req, res, next) {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}

module.exports = validateBook;
