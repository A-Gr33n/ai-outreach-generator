import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  const { to, content } = req.body;

  try {
    await resend.emails.send({
      from: "you@yourdomain.com",
      to,
      subject: "Quick question",
      html: content,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Email failed" });
  }
}