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