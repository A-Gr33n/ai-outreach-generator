import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { priceId } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",

    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],

    // 🔥 THIS IS KEY
    customer_email: req.body.email, 
    
    success_url: "http://localhost:3000?success=true&plan=pro",
    cancel_url: "http://localhost:3000/pricing",
  });

  res.json({ url: session.url });
}