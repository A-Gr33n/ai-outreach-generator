app.post("/api/generate", async (req, res) => {
  try {
    const { name, company, industry } = req.body;

    const prompt = `
Write ONE unique cold outreach email.

- Include subject line
- Mention ${company}
- Address ${name}
- Be 120–180 words
- Sound natural and human

Return only the email.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 1,
    });

    console.log("🔍 FULL RESPONSE:", JSON.stringify(response, null, 2));

    const email = response?.choices?.[0]?.message?.content;

    // 🔥 FIX: ALWAYS RETURN SOMETHING
    if (!email) {
      console.log("⚠️ No email from AI, using fallback");

      return res.json({
        email: `Subject: Quick idea for ${company}

Hi ${name},

I came across ${company} and wanted to reach out. I believe there’s an opportunity to improve outreach and engagement.

Would you be open to a quick chat?

Best regards,  
Your Name`,
      });
    }

    res.json({ email });

  } catch (err) {
    console.error("❌ SERVER ERROR:", err);

    // 🔥 NEVER BREAK FRONTEND
    res.json({
      email: "Error generating email. Please try again.",
    });
  }
});