import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const { priceId, plan, email } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",

      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      customer_email: email,

      success_url: `http://localhost:3000/success?plan=${plan}`,
      cancel_url: "http://localhost:3000/pricing",
    });

    // ✅ ONLY THIS
    res.status(200).json({ url: session.url });

  } catch (err) {
    console.error("❌ Stripe Error:", err.message);

    res.status(500).json({
      error: err.message,
    });
  }
}