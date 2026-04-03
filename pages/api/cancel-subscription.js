import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    // ⚠️ You need to store this when user subscribes
    const subscriptionId = "sub_xxx";

    await stripe.subscriptions.del(subscriptionId);

    res.status(200).json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to cancel" });
  }
}