import Container from "@/components/container";
import { cn } from "@/lib/utils";
import Image from "next/image";

const projects = [
  {
    title: "Specra",
    image: "/specra.png",
    description:
      "Design workflow platform for turning reference UIs into agent-ready implementation context.",
    meta: ["AI tooling", "Design systems", "MCP"],
    className: "lg:col-span-7",
  },
  {
    title: "Linkage",
    image: "/linkage.png",
    description:
      "Drop-in editor for workflow app UI, validation, collaboration, and run visualization.",
    meta: ["Workflow SDK", "Collaboration", "Developer tools"],
    className: "lg:col-span-5 lg:pt-28",
  },
  {
    title: "Recruiting Platform",
    image: "/rp.png",
    description:
      "High-volume application portal built for Longhorn Racing recruiting.",
    meta: ["Application portal", "Next.js", "Postgres"],
    className: "lg:col-span-6 lg:col-start-2",
  },
] as const;

const Gallery = () => {
  return (
    <Container className="">
      <div className=" flex items-end justify-between pb-6">
        <h2 className="text-4xl font-medium tracking-normal sm:text-5xl">
          Selected Work
        </h2>
      </div>

      <div className="grid gap-x-8 gap-y-12 lg:grid-cols-12">
        {projects.map((project) => (
          <article
            key={project.title}
            className={cn("group", project.className)}
          >
            <div className="overflow-hidden bg-muted">
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                width={2984}
                height={1668}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="aspect-[2984/1668] w-full rounded-xs object-cover transition-transform duration-300 group-hover:scale-[1.015]"
              />
            </div>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-2xl font-medium">{project.title}</h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap gap-1.5 sm:justify-end">
                {project.meta.map((item) => (
                  <span
                    key={item}
                    className="border rounded-xs px-2 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
};

export default Gallery;
