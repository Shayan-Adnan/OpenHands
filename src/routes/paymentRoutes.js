const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Route to handle donation and redirect to Stripe
router.post("/donate", paymentController.createCheckoutSession);

// Route to handle success (redirect from Stripe) and send SMS
router.get("/donation-success", paymentController.handleDonationSuccess);

module.exports = router;
