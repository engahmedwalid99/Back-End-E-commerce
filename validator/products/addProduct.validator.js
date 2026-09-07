const { body } = require("express-validator");

const productValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Product name must be between 3 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("old_price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Old price must be a positive number"),

  // body("image").trim().notEmpty().withMessage("Product image is required"),
  // .isURL()
  // .withMessage("Image must be a valid URL"),
];

module.exports = productValidator;
