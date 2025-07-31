const Assets = require("../../models/assets.model");

exports.getAllAssetsController = async (req, res, next) => {
  try {
    const result = await Assets.findAll();
    res.status(200).json({
      success: true,
      message: "Assets fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
