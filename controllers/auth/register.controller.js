const User = require("../../models/User");
const asyncHandler = require("express-async-handler");
const AppError = require("../../utils/error");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  const { f_name, l_name, email, phone, role, password } = req.body;

  if (!f_name || !email || !phone || !password) {
    return res.json({
      message: "All Fields is required.",
    });
  }

  const existsUser = await User.findOne({ email });
  if (existsUser) {
    return res.status(500).json({
      message: "User is aleardy exists. ⛔",
    });
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  const token = await JWT.sign(
    {
      f_name,
      l_name,
      email,
      role: role,
      phone,
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  );
  const passwordHashed = await bcrypt.hash(password, 10);
  const newUser = new User({
    f_name: f_name.trim(),
    l_name: l_name.trim(),
    phone: phone.trim(),
    email: email.trim(),
    token: token,
    role: role || "user",
    password: passwordHashed,
  });

  if (newUser) {
    await newUser.save();
  }

  return res.status(201).json({
    status: "success",
    user: newUser,
  });
});

module.exports = register;
