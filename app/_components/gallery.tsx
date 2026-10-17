import Container from "@/components/container";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import specraScreenshot from "@/public/specra.png";

const projects = [
  {
    title: "Specra",
    image: specraScreenshot,
    imagePosition: "object-top",
    description:
      "Design directly in your codebase with AI agents.",
    meta: ["AI tooling", "Design systems", "MCP"],
    href: "https://specra.tech",
    gridClassName: "lg:col-span-2 lg:col-start-1 lg:row-start-1",
    desktopSize: "calc((100vw - 128px) * 2 / 3 + 4px)",
  },
  {
    title: "Device Sorting",
    image: null,
    video: "/alexa-device-sorting.mp4",
    imagePosition: "object-top",
    description: "Device sorting for Amazon Alexa Mobile App.",
    meta: ["Amazon", "React Native", "Native Animations"],
    href: null,
    gridClassName: "lg:col-start-3 lg:row-start-1",
    desktopSize: "calc((100vw - 128px) / 3 - 12px)",
  },
  {
    title: "Linkage",
    image: "/linkage.png",
    imagePosition: "object-top",
    description:
      "Drop-in editor for workflow app UI, validation, collaboration, and run visualization.",
    meta: ["Workflow SDK", "Collaboration", "Developer tools"],
    href: "https://linkage.dev",
    gridClassName: "lg:col-span-2 lg:col-start-2 lg:row-start-2",
    desktopSize: "calc((100vw - 128px) * 2 / 3 + 4px)",
  },
  {
    title: "Recruiting Platform",
    image: "/rp.png",
    imagePosition: "object-top-left",
    description:
      "High-volume application portal built for Longhorn Racing recruiting.",
    meta: ["Application portal", "Next.js", "Postgres"],
    href: null,
    gridClassName: "lg:col-start-1 lg:row-start-2",
    desktopSize: "calc((100vw - 128px) / 3 - 12px)",
  },
] as const;

const screenshotPanelClassName =
  "overflow-hidden rounded-[calc(var(--radius-sm)+6px)] bg-muted p-[6px] lg:h-[clamp(320px,32vw,520px)]";

const Gallery = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 lg:auto-rows-fr lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className={`min-w-0 ${project.gridClassName}`}
          >
            <div className={screenshotPanelClassName}>
              {"video" in project ? (
                <div className="flex h-[360px] items-center justify-center overflow-hidden rounded-sm sm:h-[440px] lg:h-full">
                  <div className="relative h-[96%] aspect-[1206/2622] rounded-[30px] border border-zinc-500 bg-zinc-900 p-[5px] shadow-[0_8px_16px_-8px_#0003]">
                    <div aria-hidden="true" className="absolute -left-[3px] top-[18%] h-7 w-[3px] rounded-l bg-zinc-500" />
                    <div aria-hidden="true" className="absolute -left-[3px] top-[29%] h-10 w-[3px] rounded-l bg-zinc-500" />
                    <div aria-hidden="true" className="absolute -right-[4px] top-[26%] h-12 w-[3px] rounded-r bg-zinc-500" />
                    <video
                      src={project.video}
                      aria-label="Amazon Alexa device sorting demonstration"
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      preload="metadata"
                      className="h-full w-full rounded-[24px] bg-black object-cover"
                    />
                  </div>
                </div>
              ) : (
                <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                width={2984}
                height={1668}
                sizes={`(max-width: 639px) calc(100vw - 52px), (max-width: 1023px) calc(100vw - 108px), ${project.desktopSize}`}
                className={`aspect-[2984/1668] w-full rounded-sm object-cover lg:h-full lg:aspect-auto ${project.imagePosition}`}
                />
              )}
            </div>

            <div className="mt-3 flex min-w-0 flex-wrap gap-1.5">
              {project.meta.map((item) => (
                <span
                  key={item}
                  className="rounded-xs border px-2 py-1 font-mono text-[11px] leading-none text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-3">
              <div className="min-w-0">
                <h3 className="text-xl font-medium sm:text-2xl">
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xs underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    >
                      {project.title}
                      <ArrowUpRight className="size-5" aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
};

export default Gallery;
