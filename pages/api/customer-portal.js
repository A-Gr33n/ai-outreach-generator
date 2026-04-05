import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { customerId } = req.body;

    console.log("🔥 CUSTOMER ID:", customerId);

    if (!customerId) {
      return res.status(400).json({ error: "No customerId provided" });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: "https://aisalesoutreach.vercel.app/account",
    });

    res.status(200).json({ url: session.url });

  } catch (err) {
    console.error("❌ STRIPE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
}