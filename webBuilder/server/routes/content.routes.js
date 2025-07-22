const express = require("express");
const {
  createContent,
  getContent,
  getAllContents,
} = require("../src/controller/content.controller");

const router = express.Router();

router.post("/create", createContent);
router.get("/get/:id", getContent);
router.get("/all", getAllContents);

module.exports = router;
