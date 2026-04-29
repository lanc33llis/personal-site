import { WaterBackground } from "@/components/water-background";

const filters = ["AI Tools", "Full-Stack", "Product Systems"];

const projects = [
  {
    title: "Note Editor",
    role: "Slashbase, Full-stack App",
    description:
      "A collaborative editor built with Next.js, TypeScript, React, Jotai, Yjs, edge functions, RPC, and WebSockets.",
    visual: "mark",
  },
  {
    title: "Atlassian Metrics MCP",
    role: "Software engineering internship",
    description:
      "A Model Context Protocol service that exposed performance and business metrics without requiring SQL.",
    visual: "laptop",
  },
];

function MarkPreview() {
  return (
    <div className="relative flex h-full min-h-[360px] items-center justify-center overflow-hidden rounded-[16px] bg-primary">
      <div className="absolute left-0 top-0 h-full w-full bg-primary-foreground/10" />
      <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-card shadow-xl">
        <div className="h-20 w-24 rotate-[-2deg] bg-primary shadow-inner [clip-path:polygon(8%_28%,42%_8%,82%_20%,96%_60%,62%_90%,22%_82%,0_52%)]" />
        <div className="absolute h-20 w-24 rotate-[-2deg] border-[3px] border-card [clip-path:polygon(8%_28%,42%_8%,82%_20%,96%_60%,62%_90%,22%_82%,0_52%)]" />
      </div>
    </div>
  );
}

function LaptopPreview() {
  return (
    <div className="flex h-full min-h-[360px] items-center justify-center overflow-hidden rounded-[16px] bg-secondary px-8 py-10">
      <div className="relative w-full max-w-[720px] rounded-t-[14px] bg-foreground p-3 shadow-xl">
        <div className="overflow-hidden rounded-[7px] bg-card">
          <div className="flex h-10 items-center gap-4 border-b border-border px-8 text-[8px] text-muted-foreground">
            <span className="rounded bg-primary px-1.5 py-1 font-bold text-primary-foreground">
              in
            </span>
            <span className="h-4 flex-1 rounded-sm bg-muted" />
            <span>Home</span>
            <span>Jobs</span>
            <span>Messages</span>
          </div>
          <div className="px-20 py-16">
            <div className="rounded-[12px] bg-card p-7 shadow-lg">
              <div className="mb-5 h-5 w-56 rounded bg-foreground" />
              <div className="flex gap-3">
                <span className="h-4 w-20 rounded-full bg-accent" />
                <span className="h-4 w-20 rounded-full bg-muted" />
                <span className="h-4 w-24 rounded-full bg-muted" />
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <span className="h-16 rounded bg-muted" />
                <span className="h-16 rounded bg-accent" />
                <span className="h-16 rounded bg-muted" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-[-52px] bottom-[-22px] h-6 rounded-b-[30px] bg-muted-foreground/20" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main id="top" className="min-h-screen">
      <section className="h-screen flex flex-col">
        <header className="border-b py-4">
          <div className="mx-auto flex items-center px-7 sm:px-12 ">
            <p className="font-medium leading-none text-foreground">
              Lance Ellis
            </p>
          </div>
        </header>

        <div className="w-full flex-1">
          <div className="flex h-full items-center">
            <div className="w-1/2 h-fit px-7 sm:px-12">
              <h1 className="font-normal font-mono tracking-[-0.15rem] text-5xl ">
                I&apos;m a web designer and developer that helps startups go
                from 0 to 1
              </h1>
            </div>
            <div className="w-1/2 h-full ">
              <WaterBackground />
            </div>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="mx-auto max-w-[1780px] border-t border-border/60 bg-background px-7 py-16 sm:px-12 lg:px-[70px]"
      >
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="font-sans text-[clamp(2.65rem,3vw,3.65rem)] font-normal italic leading-none text-foreground">
            Selected projects
            <span
              aria-hidden="true"
              className="ml-5 inline-block h-5 w-5 translate-y-[-0.18em] rotate-45 border-b border-r border-muted-foreground"
            />
          </h2>
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                className="h-10 rounded-full border border-input px-8 text-[16px] text-muted-foreground transition-colors hover:border-ring hover:text-primary"
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-[108px]">
          {projects.map((project) => (
            <article key={project.title} className="group">
              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.14em] text-primary">
                    {project.role}
                  </p>
                  <h3 className="mt-2 text-2xl font-medium text-foreground">
                    {project.title}
                  </h3>
                </div>
                <p className="max-w-[320px] text-right text-base leading-6 text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
