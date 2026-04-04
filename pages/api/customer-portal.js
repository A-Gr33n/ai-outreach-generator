import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // ✅ Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { customerId } = req.body;

    // 🚨 Validate input
    if (!customerId) {
      return res.status(400).json({ error: "Missing customerId" });
    }

    // ✅ Create Stripe Billing Portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: "https://aisalesoutreach.vercel.app/account", // 🔥 CHANGE THIS
    });

    // ✅ Send URL back to frontend
    return res.status(200).json({
      url: session.url,
    });

  } catch (error) {
    console.error("❌ STRIPE ERROR:", error.message);

    return res.status(500).json({
      error: "Failed to create customer portal session",
    });
  }
}