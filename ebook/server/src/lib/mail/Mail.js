const sendMail = require("../../utils/sendMail");
const pug = require("pug");
const path = require("path");

async function signupMail({ receiver, OTP, id }) {
  try {
    const htmlContent = pug.renderFile(
      path.join(__dirname, "./templates/signup.jade"),
      {
        OTP: OTP,
        id: id,
      }
    );
    await sendMail({
      from: '"Stuzip" <stuzip@gmail.com>',
      to: receiver,
      subject: "Verify Your Stuzip Account Now - OTP Enclosed",
      html: htmlContent,
    });
  } catch (error) {
    throw new Error("Error sending email: " + error.message);
  }
}

async function forgotPasswordMail({ receiver, OTP, id }) {
  try {
    const htmlContent = pug.renderFile(
      path.join(__dirname, "./templates/forgotPassword.jade"),
      {
        OTP: OTP,
        id: id,
      }
    );
    await sendMail({
      from: '"Stuzip" <stuzip@gmail.com>',
      to: receiver,
      subject: "Reset Your Stuzip Password - OTP Inside",
      html: htmlContent,
    });
  } catch (error) {
    throw new Error("Error sending email: " + error.message);
  }
}

module.exports = { signupMail, forgotPasswordMail };
