import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateEmail = async () => {
  if (!user) {
    alert("Login required");
    router.push("/login");
    return;
  }

  // ✅ HARD LIMIT CHECK (BEFORE API CALL)
  if (plan === "free" && usage >= 5) {
    setMessage("❌ Free limit reached (5 emails). Upgrade to continue.");
    return; // 🚨 STOP HERE
  }

  try {
    setMessage("⏳ Generating...");

    const res = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!data.email) {
      throw new Error("No email returned");
    }

    setEmail(data.email);

    // ✅ SAFE INCREMENT (ONLY IF UNDER LIMIT)
    if (plan === "free") {
      const newUsage = Math.min(usage + 1, 5); // 🚨 CAP AT 5
      setUsage(newUsage);
      localStorage.setItem("usage", newUsage);
    }

    setMessage("✅ Email generated!");
  } catch (err) {
    console.error(err);
    setMessage("❌ Error generating email");
  }
};

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    // 1️⃣ GET FORM DATA
    const {
      prospectName,
      companyName,
      companyWebsite,
      targetRole,
      industry,
      product,
      tone,
      length
    } = req.body;


    // 2️⃣ AI RESEARCH COMPANY WEBSITE
    const research = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Research this company briefly: ${companyWebsite}. What do they do?`
        }
      ]
    });

    const companySummary = research.choices[0].message.content;


    // 3️⃣ GENERATE EMAIL USING RESEARCH
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
Write a ${tone} ${length} cold outreach email.

Prospect: ${prospectName}
Role: ${targetRole}
Company: ${companyName}

Company summary:
${companySummary}

Pitch this product:
${product}

Make it personalized.
`
        }
      ]
    });


    // 4️⃣ RETURN EMAIL
    res.status(200).json({
      email: completion.choices[0].message.content
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "OpenAI request failed"
    });

  }
}