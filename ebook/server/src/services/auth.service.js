const { hashPassword, comparePassword } = require("../lib/bcrypt/bcrypt");
const { signupMail } = require("../lib/mail/Mail");
const { createjwtToken } = require("../lib/token/jwt");
const Auth = require("../model/auth.model");
const Otp = require("../model/otp.model");
const generateOTP = require("../utils/generateOTP");

async function signupUserService({ fullName, email, password }) {
  try {
    const userExists = await Auth.findOne({
      where: { email },
    });

    if (userExists) {
      throw new Error("User already exists");
    }

    const otp = generateOTP();

    const hashedPassword = await hashPassword(password, 10);

    const result = await Auth.create({
      fullName,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    await signupMail({
      receiver: email,
      OTP: otp,
      id: result.id,
    });

    const saveOTP = await Otp.create({
      userId: result.id,
      otp,
    });

    if (!saveOTP) {
      throw new Error("Error saving OTP");
    }

    return result;
  } catch (error) {
    throw new Error(error.message || "Error signing up user");
  }
}

async function verifyUserService({ id, OTP }) {
  console.log("Verifying user with ID:", id);
  try {
    const user = await Auth.findOne({
      where: { id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isValidOTP = await Otp.findOne({ userId: id, otp: OTP });

    if (!isValidOTP) {
      throw new Error("Invalid OTP");
    }

    if (isValidOTP.status === "expired") {
      throw new Error("OTP expired");
    }

    await Auth.update(
      { isVerified: true },
      {
        where: { id },
      }
    );

    await Otp.deleteOne({ userId: id, otp: OTP });

    return {
      status: true,
      message: "User verified successfully",
    };
  } catch (error) {
    throw new Error(error.message || "Error verifying user");
  }
}

async function loginUserService({ email, password }) {
  try {
    const user = await Auth.findOne({ where: { email } });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    if (!user.isVerified) {
      throw new Error("Please verify your email first");
    }

    const isPasswordValid = await comparePassword({
      password: password,
      hashedPassword: user.password,
    });
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = await createjwtToken(user.id, "1d");

    if (user.role === "admin") {
      return {
        status: true,
        role: "admin",
        message: "Login successful",
        token,
      };
    } else {
      return {
        status: true,
        message: "Login successful",
        token,
      };
    }
  } catch (error) {
    throw new Error(error.message || "Error logging in user");
  }
}

async function forgotPasswordService(email) {
  try {
    const user = await Auth.findOne({ where: { email } });
    if (!user) {
      throw new Error(
        "Sorry, we couldn't find an account with this email address."
      );
    }
    const Otp = generateOTP();
    await Otp.create({
      userId: user.id,
      otp: Otp,
      purpose: "resetPassword",
    });

    await forgotPasswordMail({
      receiver: email,
      OTP: Otp,
      id: user.id,
    });

    return {
      status: true,
      message: `OTP sent to your ${email}`,
    };
  } catch (error) {
    throw new Error(error.message || "Error sending OTP");
  }
}

async function getSpecificUserDetailService(id) {
  try {
    const user = await Auth.findOne({ where: { id } });
    return {
      success: true,
      data: {
        name: user.fullName,
        email: user.email,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  signupUserService,
  verifyUserService,
  loginUserService,
  forgotPasswordService,
  getSpecificUserDetailService,
};
