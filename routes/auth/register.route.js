const express = require("express");
const router = express.Router();
// Controller
const registerController = require("../../controllers/auth/register.controller");
// routes
const registerValidator = require("../../validator/auth/register.validator");
const validationMiddleware = require("../../middleware/validation.middleware.validator");
router
  .route("/")
  .post(registerValidator, validationMiddleware, registerController);

module.exports = router;
