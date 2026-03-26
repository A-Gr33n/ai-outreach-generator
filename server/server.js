let usageCount = 0;
const MAX_FREE = 3;


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/generate", async (req, res) => {
  try {
    if (usageCount >= MAX_FREE) {
      return res.status(403).json({
        error: "Free limit reached",
      });
    }

   const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

    const { name, company, website, industry } = req.body;

    const prompt = `Write a short, high-converting cold outreach email.

Prospect Name: ${name}
Company: ${company}
Website: ${website}
Industry: ${industry}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    usageCount++; // ✅ increment here

    res.json({
      email: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.post("/api/bulk-generate", async (req, res) => {
  try {
    const { leads } = req.body;

    const results = [];

    for (const lead of leads) {
      const prompt = `Write a short outreach email.

Name: ${lead.name}
Company: ${lead.company}
Website: ${lead.website}
Industry: ${lead.industry}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });

      results.push({
        name: lead.name,
        company: lead.company,
        email: completion.choices[0].message.content,
      });
    }

    res.json({ results });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Bulk failed" });
  }
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // simple demo login
  if (email === "test@test.com" && password === "1234") {
    return res.json({
      success: true,
      user: { email, plan: "PRO" },
    });
  }

  res.status(401).json({ error: "Invalid credentials" });
});