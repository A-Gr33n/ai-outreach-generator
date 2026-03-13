const { name, company, website, role, industry, product, tone, length } = req.body;
import OpenAI from "openai";
import axios from "axios";
import cheerio from "cheerio";

async function getWebsiteContent(url) {
  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const text = $("body").text();

    return text.slice(0, 2000);
  } catch (error) {
    return "Could not read website content.";
  }
}

if (usageCount >= 3) {
  alert("Free demo limit reached. Upgrade to continue.");
  return;
}

setUsageCount(usageCount + 1);

const websiteText = await getWebsiteContent(website);

const prompt = `
You are an AI sales assistant.

Here is information about the company website:

${websiteText}

Write 3 personalized cold outreach emails.

Prospect: ${name}
Company: ${company}
Role: ${role}

Product being offered:
${product}

Each email should:
- reference the company
- be under 120 words
- include a subject line
- feel natural and personalized
`;