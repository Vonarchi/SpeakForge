import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpeakForge — Communication Coach",
  description: "Practice speaking. Get measurable feedback. Build confident communication."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
