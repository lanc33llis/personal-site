import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { WaterBackground } from "@/components/water-background";
import ResumeGravity from "./_components/experience";
import Footer from "./_components/footer";
import Gallery from "./_components/gallery";
import CopyEmailButton from "./_components/copy-email-button";

export default function Home() {
  return (
    <main id="top" className="min-h-screen">
      <section className="flex min-h-svh flex-col lg:h-dvh">
        <header className="border-b">
          <Container className="py-4 sm:py-6">
            <p className="font-medium leading-none text-foreground">
              Lance Ellis
            </p>
          </Container>
        </header>

        <div className="flex w-full flex-1">
          <div className="flex w-full flex-1 flex-col lg:flex-row lg:items-stretch">
            <div className="flex flex-1 flex-col gap-4 px-5 pt-8 sm:px-8 lg:w-1/2 lg:justify-center lg:px-12 lg:py-0">
              <h1 className="max-w-3xl font-sans text-4xl font-medium leading-[0.95] tracking-normal sm:text-5xl lg:text-6xl">
                I&apos;m a web designer and developer that helps startups go
                from <span className="font-mono">ZER0</span> to{" "}
                <span className="font-mono">0NE</span>
              </h1>
              <div className="flex flex-wrap gap-2">
                <CopyEmailButton className="h-9 w-fit py-1.5 text-base font-medium">
                  Contact
                </CopyEmailButton>
                <Button
                  asChild
                  variant="outline"
                  className="h-9 w-fit py-1.5 text-base font-medium"
                >
                  <a href="#selected-work">Selected Work</a>
                </Button>
              </div>
              <div className="relative left-1/2 min-h-56 flex-1 w-screen -translate-x-1/2 overflow-hidden border-y lg:hidden">
                <WaterBackground />
              </div>
            </div>
            <div className="hidden w-1/2 self-stretch border-l lg:flex">
              <WaterBackground className="min-h-full flex-1" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t">
        <ResumeGravity />
      </section>

      <section id="selected-work">
        <Gallery />
      </section>

      <Footer />
    </main>
  );
}
