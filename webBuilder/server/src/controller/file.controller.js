const Assets = require("../../models/assets.model");

exports.uploadFileController = async (req, res, next) => {
  try {
    const link = req.file.path;

    const asset = await Assets.create({
      url: link,
    });

    res.status(200).json({
      success: true,
      message: "File uploaded and saved successfully",
      result: asset,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
