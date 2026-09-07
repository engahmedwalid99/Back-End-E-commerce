const express = require("express");
const router = express.Router();
const { profile } = require("../../controllers/users/users.controller");
const checkUserLogin = require("../../middleware/checkUserLogedIn.middleware");

router.get("/profile", checkUserLogin, profile);

module.exports = router;
