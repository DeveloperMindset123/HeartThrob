import { SignJWT, jwtVerify } from "jose";

export interface ValentinePayload {
  senderName: string;
  senderEmail: string;
  recipientEmail: string;
  message: string;
}

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-change-me"
);

export async function createToken(payload: ValentinePayload): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(
  token: string
): Promise<ValentinePayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      senderName: payload.senderName as string,
      senderEmail: payload.senderEmail as string,
      recipientEmail: payload.recipientEmail as string,
      message: payload.message as string,
    };
  } catch {
    return null;
  }
}
