import { Fragment } from "react";
import Container from "@/components/container";
import { getWorkProjects } from "@/lib/work";
import { GalleryWater } from "./gallery-water";
import {
  WorkMedia,
  WorkTags,
  workCardMediaHeightClass,
} from "./work-media";
import { RestoreWorkPosition, WorkCardLink } from "./work-navigation";

const cardPositions = [
  "lg:col-span-2 lg:col-start-1",
  "lg:col-start-3",
  "lg:col-span-2 lg:col-start-2",
  "lg:col-start-1",
];

const Gallery = async () => {
  const projects = await getWorkProjects();

  return (
    <Container className="sm:px-0">
      <RestoreWorkPosition />
      <div className="grid grid-cols-1 gap-y-12 sm:gap-y-16 lg:auto-rows-fr lg:grid-flow-row-dense lg:grid-cols-3 lg:gap-4">
        {projects.map((project, index) => {
          const startsRow = index % 2 === 0;
          const isUnpaired = startsRow && index === projects.length - 1;
          const position = isUnpaired
            ? "lg:col-start-3"
            : cardPositions[index % cardPositions.length];
          const media = (
            <WorkMedia project={project} wideCard={startsRow && !isUnpaired} />
          );

          return (
            <Fragment key={project.slug}>
              {isUnpaired && (
                <div
                  aria-hidden="true"
                  className={`${workCardMediaHeightClass} pointer-events-none hidden min-w-0 overflow-hidden rounded-[calc(var(--radius-sm)+6px)] lg:col-span-2 lg:col-start-1 lg:block`}
                >
                  <GalleryWater />
                </div>
              )}

              <article className={`relative min-w-0 ${position}`}>
                {project.preview ? media : null}
                <WorkCardLink slug={project.slug} stretch={Boolean(project.preview)}>
                  {project.preview ? null : media}

                  <div className="mt-3">
                    <WorkTags tags={project.tags} />
                  </div>

                  <h3
                    id={`work-title-${project.slug}`}
                    className="mt-3 text-xl font-medium sm:text-2xl"
                  >
                    {project.title}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </WorkCardLink>
              </article>
            </Fragment>
          );
        })}
      </div>
    </Container>
  );
};

export default Gallery;
