const express = require("express");

const { upload } = require("../utils/cloudinary");
const { uploadFileController } = require("../src/controller/file.controller");

const fileRouter = express.Router();

fileRouter.route("/").post(upload.single("file"), uploadFileController);

module.exports = fileRouter;
