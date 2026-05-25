import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ASTRA — AI Sales & Revenue Agency",
  description:
    "ASTRA automates B2B lead generation, outreach, and sales with cutting-edge AI — so your team can focus on closing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ background: "#000", color: "#fff" }}>{children}</body>
    </html>
  );
}
