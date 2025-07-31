const express = require("express");
const {
  getAllAssetsController,
} = require("../src/controller/assets.controller");

const router = express.Router();

router.get("/get", getAllAssetsController);

module.exports = router;
