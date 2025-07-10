const express = require("express");
const {
  createBlockController,
  getAllBlockController,
  updateBlockController,
} = require("../src/controller/block.controller");

const router = express.Router();

router.post("/create", createBlockController);
router.get("/get", getAllBlockController);
router.put("/update/:id", updateBlockController);

module.exports = router;
