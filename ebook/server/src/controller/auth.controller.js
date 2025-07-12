const {
  signupUserService,
  verifyUserService,
  loginUserService,
  getSpecificUserDetailService,
} = require("../services/auth.service");

exports.signupUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const result = await signupUserService({
      fullName,
      email,
      password,
    });
    res.status(201).json({
      status: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { OTP } = req.body;
    const id = req.query.id;
    const result = await verifyUserService({ id, OTP });
    res.status(200).json({
      status: true,
      message: "OTP verification successfull",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error verifying user",
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginUserService({ email, password });
    res.cookie("token", result.token).status(200).json({
      status: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error logging in user",
      error: error.message,
    });
  }
};

exports.getUserDetails = async (req, res) => {
  const id = req._id;
  try {
    const result = await getSpecificUserDetailService(id);
    res.status(200).json({
      status: true,
      message: "Hello",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};
