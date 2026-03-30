require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/generate", async (req, res) => {
  try {
    const { name, company, industry } = req.body;

  const prompt = `
Write ONE complete cold outreach email.

You MUST follow ALL rules:

- Start with "Subject:"
- Then write a FULL email (not just subject)
- Include at least 3 paragraphs
- Each paragraph must be 2–4 sentences
- Total length MUST be at least 120 words
- DO NOT stop early
- DO NOT return only a subject line

Context:
Name: ${name}
Company: ${company}
Industry: ${industry}

Ending (MANDATORY):
Yours sincerely,
[Your Name]

Return ONLY the email.
`;

    console.log("PROMPT:", prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 1.1,
      max_tokens: 1500,
    });

    let email = response.choices[0].message.content;
    let users = {};

    console.log("EMAIL OUTPUT:\n", email);

    // ✅ CLEAN FORMATTING
    email = email
      .replace(/\\n\\n/g, "\n\n")
      .replace(/\\n/g, "\n")
      .trim();

    // ✅ FORCE SIGNATURE
    if (!email.includes("Yours sincerely")) {
      email += "\n\nYours sincerely,\n[Your Name]";
    }

    if (plan === "free" && usage >= 5) {
  return res.status(403).json({
    error: "Free limit reached",
  });
}

    res.json({ email });

  } catch (error) {
    console.error("❌ ERROR:", error.message);

    res.json({
      email:
        "Subject: Error\n\nSomething went wrong generating the email. Please try again.\n\nYours sincerely,\n[Your Name]",
    });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});

app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("❌ Webhook error:", err.message);
    return res.sendStatus(400);
  }

  // ✅ PAYMENT SUCCESS
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const email = session.customer_email;

    // 🔥 STORE USER PLAN
    users[email] = {
      plan: "pro", // or detect from price
      subscriptionId: session.subscription,
    };

    console.log("✅ User upgraded:", email);
  }

  res.sendStatus(200);
});

app.get("/api/user/:email", (req, res) => {
  const user = users[req.params.email];

  if (!user) {
    return res.json({ plan: "free" });
  }

  res.json(user);
});