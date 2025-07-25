require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const twilio = require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

const createCheckoutSession = async (req, res) => {
  const { donorName, amount, message, phone } = req.body;

  const validPhone = process.env.TWILIO_VERIFIED_PHONE;
  if (phone !== validPhone) {
    return res.status(400).json({ error: "Only verified phone numbers can receive SMS in trial mode." });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "pkr",
          product_data: {
            name: `Donation by ${donorName}`,
            description: message || "OpenHands Donation",
          },
          unit_amount: parseInt(amount) * 100,
        },
        quantity: 1,
      }],
      mode: "payment",
      metadata: {
        donorName,
        phone,
      },
    success_url: `${process.env.SERVER_URL}/api/payment/donation-success?name=${encodeURIComponent(donorName)}&phone=${encodeURIComponent(phone)}`,
    cancel_url: `${process.env.SERVER_URL}/donation-cancel`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).send("Donation error. Please try again.");
  }
};

const handleDonationSuccess = async (req, res) => {
  const { name, phone } = req.query;
  console.log("Donation success triggered:", { name, phone });

  try {
    await twilio.messages.create({
      body: `🎉 Thank you ${name} for your generous donation to OpenHands!`,
      from: process.env.TWILIO_PHONE,
      to: phone,
    });

    res.render("paymentSuccess", {
      message: `Thank you ${name} for your donation! A confirmation SMS was sent.`,
    });
  } catch (err) {
    console.error("Twilio error:", err.message);
    res.render("paymentSuccess", {
      message: `Thank you ${name} for donating! But we couldn't send an SMS.`,
    });
  }
};

module.exports = {
  createCheckoutSession,
  handleDonationSuccess, 
};
