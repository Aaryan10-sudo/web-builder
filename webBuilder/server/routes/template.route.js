const express = require("express");
const {
  createTemplateController,
  getAllTemplateController,
  getTemplateContentByRoute,
  updateTemplateContentByRoute,
} = require("../src/controller/template.controller");
const router = express.Router();

router.post("/create", createTemplateController);
router.get("/get", getAllTemplateController);
router.get("/get-by-route", getTemplateContentByRoute);
router.put("/update", updateTemplateContentByRoute);

module.exports = router;
