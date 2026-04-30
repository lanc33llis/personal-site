import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { WaterBackground } from "@/components/water-background";
import Experience from "./_components/experience";

export default function Home() {
  return (
    <main id="top" className="min-h-screen">
      <section className="h-screen flex flex-col">
        <header className="border-b">
          <Container className="py-4">
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
                <Button className="text-base w-fit py-1.5 font-medium h-fit">
                  Contact
                </Button>
                <Button
                  variant="outline"
                  className="text-base w-fit py-1.5 font-medium h-fit"
                >
                  Gallery
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
        <Experience />
      </section>
    </main>
  );
}
