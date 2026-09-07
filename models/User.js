const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userdata = new Schema({
  f_name: {
    type: String,
    required: true,
    minLength: [3, "First name must be more than 3 char"],
    maxLength: [20, "First name must be less than 3 char"],
  },
  l_name: {
    type: String,
    minLength: [3, "First name must be more than 3 char"],
    maxLength: [20, "First name must be less than 3 char"],
  },
  phone: {
    type: Number,
    required: true,
    minLength: [10, "Phone can't less than 10"],
    maxLength: [11, "Phone can't mare than 11"],
  },
  role: {
    type: String,
    enum: ["user", "seller", "admin"],
    default: "user",
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "password at least 8 char"],
  },
  token: {
    type: String,
  },
});

const newUser = mongoose.model("User", userdata);

module.exports = newUser;
