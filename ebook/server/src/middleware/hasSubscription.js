const Auth = require("../model/auth.model");

async function hasSubscription(req, res, next) {
  try {
    const id = req._id;
    const user = await Auth.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (!user.hasSubscription) {
      return res.status(403).json({
        success: false,
        message:
          "Subscription required. Please subscribe to access this feature.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

module.exports = hasSubscription;
