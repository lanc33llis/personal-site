import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
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

export const metadata: Metadata = {
  title: {
    default: "Lance Ellis | Web Designer & Developer",
    template: "%s | Lance Ellis",
  },
  description:
    "Portfolio for Lance Ellis, a web designer and developer helping startups build polished full-stack products, AI tools, and scalable systems.",
  applicationName: "Lance Ellis Portfolio",
  authors: [{ name: "Lance Ellis" }],
  creator: "Lance Ellis",
  keywords: [
    "Lance Ellis",
    "web designer",
    "web developer",
    "software engineer",
    "full-stack developer",
    "AI tools",
    "startup product development",
    "Next.js developer",
  ],
  openGraph: {
    title: "Lance Ellis | Web Designer & Developer",
    description:
      "Portfolio for Lance Ellis, focused on web design, full-stack products, AI tools, and scalable systems.",
    siteName: "Lance Ellis Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Lance Ellis | Web Designer & Developer",
    description:
      "Portfolio for Lance Ellis, focused on web design, full-stack products, AI tools, and scalable systems.",
  },
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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
