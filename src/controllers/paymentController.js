require("dotenv").config();
const { createStripeSession } = require("../services/paymentService");

const createCheckoutSession = async (req, res) => {
  try {
    const { firstName, lastName, donationAmount } = req.body;
    const session = await createStripeSession(
      firstName,
      lastName,
      donationAmount
    );
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCheckoutSession };
