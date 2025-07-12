const { default: mongoose } = require("mongoose");

const bookmetadataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
  },
  publishedYear: {
    type: Number,
    required: [true, "Published year is required"],
  },
  coverPage: {
    type: String,
    required: [true, "Cover page is required"],
    unique: true,
  },
  category: {
    type: String,
    required: [true, "Genre is required"],
  },
  language: {
    type: String,
    required: [true, "Language is required"],
  },
});

const Bookmetadata = mongoose.model("Bookmetadata", bookmetadataSchema);
module.exports = Bookmetadata;
