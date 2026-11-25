import { socialMetadata } from "@/lib/social-metadata";
import type { Viewport } from "next";
import { Libertinus_Serif_Display } from "next/font/google";
import { WaterBackground } from "@/components/water-background";
import { HomeHero } from "./_components/home-hero";
import Footer from "./_components/footer";
import Gallery from "./_components/gallery";
import CopyEmailButton from "./_components/copy-email-button";

export const metadata = socialMetadata({
  title: "Lance Ellis | Design Engineer",
  description: "I design and build software. Explore how I built Specra for editing interfaces with AI agents and designed device sorting for Amazon Alexa.",
  path: "/",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

const profile = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: "https://lanc3.dev/",
  name: "Lance Ellis | Design Engineer",
  description: metadata.description,
  mainEntity: {
    "@type": "Person",
    "@id": "https://lanc3.dev/#lance-ellis",
    name: "Lance Ellis",
    jobTitle: "Design Engineer",
    url: "https://lanc3.dev/",
  },
};

const libertinusDisplay = Libertinus_Serif_Display({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profile).replace(/</g, "\\u003c") }}
      />
      <main id="top" className="min-h-screen">
        <HomeHero>
          <div className="grid flex-1 grid-rows-[1fr_1fr] max-sm:grid-rows-[minmax(50svh,auto)_1fr] lg:grid-cols-2 lg:grid-rows-1">
            <div className="flex flex-col gap-3 px-5 pt-2.5 max-sm:items-center max-sm:justify-center max-sm:pb-2.5 max-sm:text-center sm:px-8 sm:pt-8 lg:justify-center lg:px-12 lg:py-0">
              <p className="font-sans text-lg leading-6 text-foreground">
                I’m Lance.
              </p>
              <h1 className={`${libertinusDisplay.className} max-w-3xl text-4xl leading-[1.05] tracking-normal sm:text-5xl lg:text-6xl`}>
                I design and build software.
              </h1>
              <div className="mt-3 flex sm:pb-8">
                <CopyEmailButton className="h-9 w-fit rounded-[18px] py-1.5 text-base font-medium">
                  Contact
                </CopyEmailButton>
              </div>
            </div>
            <div className="relative overflow-hidden border-t sm:[clip-path:inset(0_round_0_0_var(--radius-3xl)_var(--radius-3xl))] lg:border-t-0 lg:[clip-path:inset(0_round_0_0_0_var(--radius-3xl))]">
              <div className="absolute inset-0">
                <WaterBackground />
              </div>
            </div>
          </div>
        </HomeHero>

        <section id="selected-work" tabIndex={-1} className="mt-2 mb-12 sm:mt-6 sm:mb-16 lg:mt-10">
          <Gallery />
        </section>
      </main>
      <Footer className="sm:px-0" />
    </div>
  );
}
