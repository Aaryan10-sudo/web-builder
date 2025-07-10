const express = require("express");
const { createPage, getPage } = require("../src/controller/page.controller");
const router = express.Router();

router.post("/create", createPage);
router.get("/get/:slug", getPage);

module.exports = router;
