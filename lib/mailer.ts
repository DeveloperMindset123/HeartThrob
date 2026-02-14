import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const info = await transporter.sendMail({
    from: `HeartThrob <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
    replyTo,
  });
  return { id: info.messageId };
}
