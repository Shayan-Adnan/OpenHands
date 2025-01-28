const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const createStripeSession = async (firstName, lastName, donationAmount) => {
  return await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "PKR",
          product_data: {
            name: `Donation for ${firstName} ${lastName}`,
          },
          unit_amount: donationAmount * 100,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.SERVER_URL}/paymentSuccess`,
    cancel_url: `${process.env.SERVER_URL}/paymentCancel`,
  });
};

module.exports = { createStripeSession };
