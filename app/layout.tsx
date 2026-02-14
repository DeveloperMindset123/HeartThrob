import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HeartThrob",
  description: "Send a heartfelt Valentine's Day message to someone special",
  metadataBase: new URL(process.env.BASE_URL || "http://localhost:3000"),
  openGraph: {
    title: "HeartThrob",
    description: "Send a heartfelt Valentine's Day message to someone special",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grain-overlay bg-heartthrob min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
