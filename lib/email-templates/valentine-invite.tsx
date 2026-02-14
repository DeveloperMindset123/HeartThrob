export function renderValentineInvite({
  senderName,
  valentineUrl,
}: {
  senderName: string;
  valentineUrl: string;
}): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="background-color:#fff0f3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0;padding:0;">
  <div style="margin:0 auto;padding:40px 20px;max-width:480px;">
    <div style="background-color:#ffffff;border-radius:12px;padding:32px;text-align:center;border:1px solid #ffdde4;">
      <p style="font-size:48px;margin:0 0 16px 0;">\u{1F48C}</p>
      <h1 style="font-size:24px;font-weight:bold;color:#8d0d32;margin:0 0 24px 0;">You have a Valentine!</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin:0 0 16px 0;">Hi there,</p>
      <p style="font-size:16px;line-height:1.6;color:#333;margin:0 0 16px 0;">
        <strong>${escapeHtml(senderName)}</strong> has a Valentine's Day message for you. They wanted you to know something special.
      </p>
      <p style="font-size:16px;line-height:1.6;color:#333;margin:0 0 16px 0;">
        Click below to see what they have to say:
      </p>
      <a href="${escapeHtml(valentineUrl)}" style="display:inline-block;background-color:#ff2d55;border-radius:8px;color:#ffffff;font-size:16px;font-weight:bold;text-decoration:none;padding:14px 32px;margin:24px auto;">
        View Your Valentine \u{1F495}
      </a>
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
