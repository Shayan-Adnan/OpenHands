const express = require("express");
const paymentController = require("../controllers/paymentController");
const router = express.Router();

router.post("/checkout", paymentController.createCheckoutSession);

module.exports = router;
