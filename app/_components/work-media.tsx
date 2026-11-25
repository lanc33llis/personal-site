import { WorkVideo } from "./work-video";
import Image from "next/image";
import { ViewTransition } from "react";
import type {} from "react/canary";
import { cn } from "@/lib/utils";
import type { WorkProject } from "@/lib/work";
import { workMediaFrameClass } from "./work-media-frame";
import "./work-transitions.css";

export const workCardMediaHeightClass = "lg:h-[clamp(320px,32vw,520px)]";

export function WorkMedia({
  project,
  hero = false,
  wideCard = false,
}: {
  project: WorkProject;
  hero?: boolean;
  wideCard?: boolean;
}) {
  const transition = {
    name: `work-media-${project.slug}`,
    share: "work-media",
    default: "none",
  };
  const panelClassName = cn(
    workMediaFrameClass,
    !hero && workCardMediaHeightClass,
  );

  if (project.preview) {
    const Preview = project.preview;

    return (
      <ViewTransition {...transition} share="work-preview-frame">
        <div
          inert={!hero}
          className={cn(
            panelClassName,
            "flex min-h-64 items-center justify-center px-5 py-5",
            hero && "sm:min-h-80",
          )}
        >
          <ViewTransition
            name={`work-preview-${project.slug}`}
            share="work-preview"
            default="none"
          >
            <Preview />
          </ViewTransition>
        </div>
      </ViewTransition>
    );
  }

  const imageAlt = project.imageAlt ?? `${project.title} screenshot`;
  const desktopSize = wideCard
    ? "calc((100vw - 128px) * 2 / 3 + 4px)"
    : "calc((100vw - 128px) / 3 - 12px)";

  if (project.video?.layout === "screen") {
    return (
      <ViewTransition {...transition}>
        <div className={workMediaFrameClass}>
          <WorkVideo
            aria-label={project.video.label}
            src={project.video.src}
            poster={project.video.poster ?? project.image.src}
            controls={hero}
            loop={!hero}
            width={project.image.width}
            height={project.image.height}
            className="block h-auto w-full rounded-sm"
          />
        </div>
      </ViewTransition>
    );
  }

  if (project.video && project.video.layout !== "screen") {
    return (
      <div className={panelClassName}>
        <div
          className={cn(
            "flex items-center justify-center",
            hero ? "h-[420px] sm:h-[540px]" : "h-[360px] sm:h-[440px] lg:h-full",
          )}
        >
          <ViewTransition {...transition}>
            <div className="relative h-[96%] aspect-[1206/2622] rounded-[30px] border border-zinc-500 bg-zinc-900 p-[5px] shadow-[0_8px_16px_-8px_#0003]">
              <div aria-hidden="true" className="absolute -left-[3px] top-[18%] h-7 w-[3px] rounded-l bg-zinc-500" />
              <div aria-hidden="true" className="absolute -left-[3px] top-[29%] h-10 w-[3px] rounded-l bg-zinc-500" />
              <div aria-hidden="true" className="absolute -right-[4px] top-[26%] h-12 w-[3px] rounded-r bg-zinc-500" />
              <WorkVideo
                aria-label={project.video.label}
                src={project.video.src}
                poster={project.video.poster ?? project.image.src}
                controls={hero}
                loop={!hero}
                className="h-full w-full rounded-[24px] bg-black object-cover"
              />
            </div>
          </ViewTransition>
        </div>
      </div>
    );
  }

  return (
    <ViewTransition {...transition}>
      <div className={panelClassName}>
        <Image
          src={project.image}
          alt={imageAlt}
          preload={hero}
          sizes={
            hero
              ? "(max-width: 639px) calc(100vw - 52px), (max-width: 767px) calc(100vw - 108px), 660px"
              : `(max-width: 639px) calc(100vw - 52px), (max-width: 1023px) calc(100vw - 108px), ${desktopSize}`
          }
          className={cn(
            "aspect-[2984/1668] w-full rounded-sm object-cover object-top",
            !hero && "lg:h-full lg:aspect-auto",
            hero && project.slug !== "recruiting-platform" && "lg:aspect-[2/1]",
          )}
          style={{ objectPosition: project.imagePosition }}
        />
      </div>
    </ViewTransition>
  );
}

export function WorkTags({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-md border px-2 py-1 font-mono text-[11px] leading-none text-muted-foreground"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
