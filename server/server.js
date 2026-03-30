require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

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

