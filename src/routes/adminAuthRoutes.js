const express = require("express");
const adminAuthController = require("../controllers/adminAuthController");

const router = express.Router();

router.post("/adminLogin", adminAuthController.loginAdmin);

module.exports = router;
