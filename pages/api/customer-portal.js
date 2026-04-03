//import Stripe from "stripe";

//const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//export default async function handler(req, res) {
 // try {
   // const { customerId } = req.body;

    //if (!customerId) {
     // return res.status(400).json({ error: "No customer ID" });
   // }

   // const session = await stripe.billingPortal.sessions.create({
   //   customer: customerId,
    //  return_url: "https://aisalesoutreach.vercel.app/account",
    //});

    //res.status(200).json({ url: session.url });

  //} catch (error) {
   // console.error("❌ STRIPE PORTAL ERROR:", error);
    //res.status(500).json({ error: "Failed to create portal session" });
  //}
//}

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    // 🔥 You MUST store this when user subscribes
    const customerId = req.body.customerId;

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: "https://aisalesoutreach.vercel.app/account",
    });

    res.status(200).json({ url: session.url });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Stripe portal error" });
  }
}