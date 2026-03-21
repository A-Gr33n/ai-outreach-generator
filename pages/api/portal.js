import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }

    // 🔍 Find customer
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      return res.status(404).json({ error: "No customer found" });
    }

    const customer = customers.data[0];

    // 🔥 Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: "http://localhost:3000",
    });

    res.status(200).json({ url: session.url });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}