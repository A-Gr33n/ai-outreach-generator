import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, company, industry } = req.body;
    const { campaignName, userId } = req.body;

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

    const email = response?.choices?.[0]?.message?.content;

    // ✅ fallback if AI fails
    if (!email) {
      return res.status(200).json({
        email: `Subject: Quick idea for ${company}

        const { data: campaign } = await supabase
  .from("campaigns")
  .insert([{ user_id: userId, name: campaignName }])
  .select()
  .single();

Hi ${name},

I came across ${company} and wanted to reach out. I believe there’s an opportunity to improve outreach and engagement.

Would you be open to a quick chat?

Yours sincerely,  
[Your Name]`,
      });
    }

    return res.status(200).json({ email });

  } catch (err) {
    console.error("❌ SERVER ERROR:", err);

    // 🔥 FIX: return REAL error (not fake email)
    return res.status(500).json({
      error: "Failed to generate email",
    });
  }
}

