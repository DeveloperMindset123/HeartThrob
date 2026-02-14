import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyToken } from "@/lib/token";
import { sendEmail } from "@/lib/mailer";
import { renderValentineResult } from "@/lib/email-templates/valentine-result";

const respondSchema = z.object({
  token: z.string().min(1),
  response: z.enum(["yes", "no"]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = respondSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { token, response } = parsed.data;

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid or expired valentine" },
        { status: 400 }
      );
    }

    const isYes = response === "yes";

    const result = await sendEmail({
      to: payload.senderEmail,
      subject: isYes
        ? "Great news about your Valentine!"
        : "Your Valentine got a response",
      html: renderValentineResult({
        recipientEmail: payload.recipientEmail,
        response,
      }),
    });

    console.log("Response notification sent, email id:", result.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Respond error:", message, error);
    return NextResponse.json(
      { error: "Failed to send response", details: message },
      { status: 500 }
    );
  }
}
