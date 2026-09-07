const express = require("express");
const router = express.Router();
const loginController = require("../../controllers/auth/login.controller");
const loginValidator = require("../../validator/auth/login.validator");
const validationMiddleware = require("../../middleware/validation.middleware.validator");

router.post("/", loginValidator, validationMiddleware, loginController);

module.exports = router;
