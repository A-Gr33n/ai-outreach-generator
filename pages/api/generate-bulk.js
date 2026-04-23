import OpenAI from "openai";
import { supabase } from "../../lib/supabase";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const { leads, product, userId, campaignName } = req.body;

  if (!leads || !leads.length) {
    return res.status(400).json({ error: "No leads provided" });
  }

  try {
    // ✅ 1. CREATE CAMPAIGN
    const { data: campaign, error: campaignError } = await supabase
      .from("campaigns")
      .insert([
        {
          user_id: userId,
          name: campaignName || "Untitled Campaign",
        },
      ])
      .select()
      .single();

    if (campaignError) throw campaignError;

    // ✅ 2. GENERATE EMAILS (parallel = faster)
    const results = await Promise.all(
      leads.map(async (lead) => {
        const prompt = `
Write a short cold email.

Prospect: ${lead.name}
Company: ${lead.company}
Role: ${lead.role}

Product: ${product}
`;

        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
        });

        const email = completion.choices[0].message.content;

        return {
          name: lead.name,
          company: lead.company,
          email,
          campaign_id: campaign.id,
          user_id: userId,
        };
      })
    );

    // ✅ 3. SAVE TO SUPABASE
    await supabase.from("emails").insert(results);

    res.status(200).json({ results });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Bulk generation failed" });
  }
}