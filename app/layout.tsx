import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { WorkHistoryNavigation } from "./_components/work-navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  weight: "variable",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const portfolioTitle = "Lance Ellis | Design Engineer";
const portfolioDescription =
  "Lance Ellis is a design engineer building Specra, a tool for editing interfaces with AI agents. His work includes device sorting for Amazon Alexa.";

export const metadata: Metadata = {
  metadataBase: new URL("https://lanc3.dev"),
  title: {
    default: portfolioTitle,
    template: "%s | Lance Ellis",
  },
  description: portfolioDescription,
  applicationName: "Lance Ellis Portfolio",
  authors: [{ name: "Lance Ellis" }],
  creator: "Lance Ellis",
  keywords: [
    "Lance Ellis",
    "design engineer",
    "web developer",
    "software engineer",
    "full-stack developer",
    "AI tools",
    "startup product development",
    "Next.js developer",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <WorkHistoryNavigation />
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
