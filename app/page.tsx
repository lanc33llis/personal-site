import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { WaterBackground } from "@/components/water-background";
import ResumeGravity from "./_components/experience";
import Footer from "./_components/footer";
import Gallery from "./_components/gallery";
import { toast } from "sonner";
import CopyEmailButton from "./_components/copy-email-button";

export default function Home() {
  return (
    <main id="top" className="min-h-screen">
      <section className="h-screen flex flex-col">
        <header className="border-b">
          <Container className="py-6">
            <p className="font-medium leading-none text-foreground">
              Lance Ellis
            </p>
          </Container>
        </header>

        <div className="w-full flex-1">
          <div className="flex h-full items-center">
            <div className="w-1/2 h-fit px-7 sm:px-12 flex flex-col gap-4">
              <h1 className="font-sans font-medium tracking-[-0.15rem] text-5xl ">
                I&apos;m a web designer and developer that helps startups go
                from <span className="font-mono">ZER0</span> to{" "}
                <span className="font-mono">0NE</span>
              </h1>
              <div className="flex gap-2">
                <CopyEmailButton className="text-base w-fit py-1.5 font-medium h-fit">
                  Contact
                </CopyEmailButton>
                <Button
                  variant="outline"
                  className="text-base w-fit py-1.5 font-medium h-fit"
                >
                  Selected Work
                </Button>
              </div>
            </div>
            <div className="w-1/2 h-full ">
              <WaterBackground />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t">
        <ResumeGravity />
      </section>

      <section className="">
        <Gallery />
      </section>

      <Footer />
    </main>
  );
}
