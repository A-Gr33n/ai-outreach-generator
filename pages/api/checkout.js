import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export default async function handler(req, res) {
  try {
    const { priceId, plan, email, userId } = req.body;

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

      // 🔥 ADD THIS
      metadata: {
        userId: userId,
        plan: plan,
      },

      success_url: `http://localhost:3000/success?plan=${plan}`,
      cancel_url: "http://localhost:3000/pricing",
    });

    res.status(200).json({ url: session.url });

  } catch (err) {
    console.error("❌ Stripe Error:", err.message);

    res.status(500).json({
      error: err.message,
    });

    const res = await fetch("/api/checkout", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    priceId: "price_xxx",
    plan: "pro",
    email: user.email,
    userId: user.id, // 🔥 REQUIRED
  }),
});
  }
}