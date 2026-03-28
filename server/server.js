require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

// ✅ CREATE APP FIRST
const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ OPENAI SETUP
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// ✅ GENERATE EMAILS
app.post("/api/generate", async (req, res) => {
  try {
    const { name, company, industry } = req.body;

    if (!name || !company) {
      return res.status(400).json({ error: "Missing fields" });
    }

   const prompt = `
Write ONE high-quality cold outreach email.

Context:
- Recipient Name: ${name}
- Company: ${company}
- Industry: ${industry || "their industry"}

Requirements:
- Include a strong subject line
- Be between 120–180 words
- Sound professional, polished, and credible
- Feel natural and human (not AI-generated)
- Clearly reference the company and show awareness
- Include a subtle value proposition (how we can help them)
- Use varied sentence structure (no repetition)
- Avoid generic phrases like "I hope you're doing well"
- End with a soft call-to-action (not pushy)

Style:
- Confident but not aggressive
- Personal and tailored
- Written like a real business development rep

IMPORTANT:
Make the email feel thoughtfully written and specific — not templated.
Do not repeat patterns. Make it feel fresh every time.

Return ONLY the email.

Focus on how you can help with: ${randomAngle}
`;

const angles = [
  "increasing revenue",
  "improving customer engagement",
  "streamlining operations",
  "scaling outreach efforts",
  "optimizing marketing performance"
];

const randomAngle = angles[Math.floor(Math.random() * angles.length)];


    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 1,
    });

    const rawText = response?.choices?.[0]?.message?.content;

    // 🔥 Fallback if AI fails
    if (!rawText) {
      return res.json({
        emails: [
          `Subject: Quick idea for ${company}

Hi ${name},

I came across ${company} and wanted to reach out. I believe there’s an opportunity to improve your outreach and generate more engagement.

Would you be open to a quick chat?

Best regards,  
Your Name`,
        ],
      });
    }

    let emails = rawText
      .split("---")
      .map((e) => e.trim())
      .filter((e) => e.length > 0);

    if (emails.length === 0) {
      emails = [rawText];
    }

    res.json({ emails });

  } catch (err) {
    console.error("❌ SERVER ERROR:", err);

    res.json({
      emails: [
        "Subject: Quick outreach\n\nHi there,\n\nJust reaching out to connect.\n\nBest,\nYour Name",
      ],
    });
  }
});

// ✅ START SERVER LAST
app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});

console.log("API KEY:", process.env.OPENAI_API_KEY);
console.log("OPENAI RESPONSE:", response);