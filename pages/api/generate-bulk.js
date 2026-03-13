import OpenAI from "openai";

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req,res){

const {leads,product} = req.body;

let results = [];

for(const lead of leads){

const prompt = `
Write a short cold email.

Prospect: ${lead.name}
Company: ${lead.company}
Role: ${lead.role}

Product: ${product}
`;

const completion = await openai.chat.completions.create({
model:"gpt-4o-mini",
messages:[{role:"user",content:prompt}]
});

results.push({
name:lead.name,
email:completion.choices[0].message.content
});

}

res.status(200).json({results});

}