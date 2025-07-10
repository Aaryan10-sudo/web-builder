const Blocks = require("../model/blocks.model");

exports.createBlockController = async (req, res, next) => {
  const data = req.body;

  try {
    const result = await Blocks.create(data);
    res.status(201).json({
      success: true,
      message: "Block created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getAllBlockController = async (req, res, next) => {
  try {
    const data = await Blocks.findAll();
    res.json({
      success: true,
      message: "All blocks fetched successfully",
      data: data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.updateBlockController = async (req, res, next) => {
  let data = req.body;
  const { id } = req.params;
  const { content } = req.body;

  try {
    await Blocks.update({ content }, { where: { id } });
    res.json({ success: true, message: "Block updated successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed.", error });
  }
};
