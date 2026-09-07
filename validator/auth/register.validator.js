const { body } = require("express-validator");

const registerValidator = [
  body("f_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("First name must be between 3 and 20 characters"),

  body("l_name")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Last name must be between 3 and 20 characters"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required")
    .isLength({ min: 10, max: 11 })
    .withMessage("Phone must be between 10 and 11 digits")
    .isNumeric()
    .withMessage("Phone must contain only numbers"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

module.exports = registerValidator;
