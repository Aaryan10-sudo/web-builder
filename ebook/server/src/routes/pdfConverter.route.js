const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  convertPdfToMarkdown,
} = require("../controller/markdownConverter.controller");
const upload = multer({ dest: "" });

router.post("/", upload.single("pdf"), convertPdfToMarkdown);

module.exports = router;
