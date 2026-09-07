const User = require("../../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existsUser = await User.findOne({ email: email });

  if (!existsUser) {
    return res.status(404).json({
      status: "failed",
      message: "User not found 🚫",
    });
  }

  const decodedPassword = await bcrypt.compare(password, existsUser.password);
  const JWT_SECRET = process.env.JWT_SECRET;
  const newToken = JWT.sign(
    {
      f_name: existsUser.f_name,
      l_name: existsUser.l_name,
      email: existsUser.email,
      role: existsUser.role,
      phone: existsUser.phone,
    },
    JWT_SECRET,
    { expiresIn: "30d" },
  );

  if (!decodedPassword) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid password. 🚫",
    });
  }

  existsUser.token = newToken;
  await existsUser.save();

  return res.status(200).json({
    status: "success",
    message: "loged in",
    user: existsUser,
  });
});

module.exports = loginController;
