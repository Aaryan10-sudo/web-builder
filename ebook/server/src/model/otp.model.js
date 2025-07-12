const { default: mongoose } = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "expired"],
      default: "active",
    },
    purpose: {
      type: String,
      enum: ["signup", "resetPassword"],
      default: "signup",
    },
  },
  {
    timestamps: true,
  }
);

const Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp;
