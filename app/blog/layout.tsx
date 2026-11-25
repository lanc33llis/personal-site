import type { Metadata } from "next";
import { GeistPixelSquare } from "geist/font/pixel";
import Footer from "@/app/_components/footer";
import SiteHeader from "@/app/_components/site-header";

export const metadata: Metadata = {
  title: {
    default: "Blog",
    template: "%s | Lance Ellis",
  },
  description:
    "Notes from Lance Ellis on web design, product development, and building thoughtful software.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${GeistPixelSquare.variable} flex min-h-svh flex-col bg-background text-foreground`}
    >
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
