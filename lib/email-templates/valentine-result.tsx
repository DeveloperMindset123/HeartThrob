export function renderValentineResult({
  recipientEmail,
  response,
}: {
  recipientEmail: string;
  response: "yes" | "no";
}): string {
  const isYes = response === "yes";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="background-color:#fff0f3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0;padding:0;">
  <div style="margin:0 auto;padding:40px 20px;max-width:480px;">
    <div style="background-color:#ffffff;border-radius:12px;padding:32px;text-align:center;border:1px solid #ffdde4;">
      <p style="font-size:48px;margin:0 0 16px 0;">${isYes ? "\u{1F389}\u{1F495}" : "\u{1F494}"}</p>
      <h1 style="font-size:24px;font-weight:bold;color:#8d0d32;margin:0 0 24px 0;">
        ${isYes ? "Great news!" : "Maybe next time..."}
      </h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin:0 0 16px 0;">
        ${isYes
          ? `${escapeHtml(recipientEmail)} said YES to being your Valentine!`
          : `${escapeHtml(recipientEmail)} wasn't ready this time.`}
      </p>
      <p style="font-size:16px;line-height:1.6;color:#333;margin:0 0 16px 0;">
        ${isYes
          ? "Time to celebrate! \u{1F973}\u{1F431}"
          : "Don't worry, you're still amazing! \u{1F431}"}
      </p>
      <hr style="border:none;border-top:1px solid #ffdde4;margin:32px 0 16px 0;" />
      <p style="font-size:13px;color:#999;margin:0;">Sent with love via HeartThrob \u{1F431}</p>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
