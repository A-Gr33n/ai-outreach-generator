require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ add this
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
Generate 10 professional cold outreach emails.

Context:
- Name: ${name}
- Company: ${company}
- Industry: ${industry || "their industry"}

RULES:
- Each email must be 120–180 words
- Include a subject line at the top
- Use proper paragraph spacing (line breaks, not \\n\\n text)
- DO NOT include "\\n" or "\\n\\n" anywhere in output
- Write in clean paragraphs (like a real email)

ENDING (MANDATORY):
Always end EXACTLY like this:

Yours sincerely,
[Your Name]

STYLE:
- Professional and natural
- Personalized to the company
- Avoid generic phrases

FORMAT:
Return ONLY a JSON array:
[
  "Subject: ... Email...",
  "Subject: ... Email..."
]
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
  temperature: 1.2,
  max_tokens: 1500, // 🔥 increase length
});

    const content = response.choices[0].message.content;

    let emails = [];

    try {
      emails = JSON.parse(content);
    } catch (err) {
      console.log("❌ JSON parse failed, fallback split");

      // fallback if AI doesn't return perfect JSON
      emails = content
        .split("Subject:")
        .slice(1)
        .map((e) => "Subject:" + e.trim());
    }

    // safety fallback
    if (!emails || emails.length === 0) {
      return res.json({
        emails: [
          `Subject: Opportunity with ${company}

Hi ${name},

I’ve been following ${company} and wanted to reach out with a tailored idea that could help strengthen your position in the ${industry} space.

From what I’ve seen, there’s a clear opportunity to improve engagement and drive more meaningful results through a refined outreach strategy that aligns with your brand’s direction.

I’d love to share a few specific ideas that could be relevant to your current initiatives and explore whether there’s a fit.

Would you be open to a quick conversation sometime this week?

Best regards,  
Your Name`,
        ],
      });
    }

    res.json({ emails });

  } catch (error) {
    console.error("❌ ERROR:", error.message);

    res.json({
      emails: [
        "Subject: Error\n\nSomething went wrong generating emails. Please try again.",
      ],
    });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});

// ✅ START SERVER LAST
app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});

openai.chat.completions.create({
    model: "gpt-3.5-turbo", // or "gpt-4"
    messages: [{ role: "user", content: "Hello world" }],
}).then((data) => {
    // We use 'data' here because that's what is inside the .then((data) => ...)
    console.log("OPENAI RESPONSE:", data); 
}).catch((err) => {
    console.error("ERROR:", err);
});



console.log("API KEY:", process.env.OPENAI_API_KEY);
