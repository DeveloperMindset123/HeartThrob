import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createToken } from "@/lib/token";
import { resend } from "@/lib/resend";
import { renderValentineInvite } from "@/lib/email-templates/valentine-invite";

const sendSchema = z.object({
  senderName: z.string().min(1).max(100),
  senderEmail: z.string().email(),
  recipientEmail: z.string().email(),
  message: z.string().min(1).max(500),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = sendSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { senderName, senderEmail, recipientEmail, message } = parsed.data;

    const token = await createToken({
      senderName,
      senderEmail,
      recipientEmail,
      message,
    });

    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const valentineUrl = `${baseUrl}/valentine/${token}`;

    const { data, error } = await resend.emails.send({
      from: "HeartThrob <onboarding@resend.dev>",
      to: recipientEmail,
      reply_to: senderEmail,
      subject: `${senderName} sent you something special`,
      html: renderValentineInvite({ senderName, valentineUrl }),
    });

    if (error) {
      console.error("Resend API error:", JSON.stringify(error));
      return NextResponse.json(
        { error: "Failed to send email", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, emailId: data?.id });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Send error:", msg);
    return NextResponse.json(
      { error: "Failed to send valentine", details: msg },
      { status: 500 }
    );
  }
}
