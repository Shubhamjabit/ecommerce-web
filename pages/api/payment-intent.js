import Stripe from "stripe";
// const stripe = new Stripe(
//   "sk_test_51MokE6DmPekReW9AxG8Qcfwx0WWyHBhWF2LLrmU3vcRm7nEWoFwZZYmGfLELUXSppiWfPDokbWos3Ro3Jc2SkwdL0007QR3zqQ",
//   { maxNetworkRetries: 2 }
// );

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  maxNetworkRetries: 2,
});

export default async (req, res) => {
  let { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "AUD",
    });
    res.status(200).json(paymentIntent);
    return;
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
