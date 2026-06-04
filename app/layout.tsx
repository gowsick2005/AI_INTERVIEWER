import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const inter = Inter({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ResumeAI — AI Resume Analyzer",
  description: "Premium AI resume analysis dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${jakarta.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0D0D14]">{children}</body>
    </html>
  );
}
