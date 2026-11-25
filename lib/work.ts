import "server-only";

import { readdir } from "node:fs/promises";
import path from "node:path";
import type { StaticImageData } from "next/image";
import { cache, type ComponentType } from "react";

type WorkMetadata = {
  title: string;
  description: string;
  tags: readonly string[];
  order?: number;
  heroCaption?: string;
} & (
  | {
      preview?: never;
      image: StaticImageData;
      imageAlt?: string;
      imagePosition?: string;
      video?: { src: string; label: string; layout?: "screen"; poster?: string };
    }
  | { preview: ComponentType; image?: never }
);

export type WorkProject = WorkMetadata & { slug: string };

const workDirectory = path.join(process.cwd(), "content", "work");

export const getWorkSlugs = cache(async () => {
  const files = await readdir(workDirectory, { withFileTypes: true });

  return files
    .filter((file) => file.isFile() && /^[a-z0-9-]+\.mdx$/.test(file.name))
    .map((file) => file.name.slice(0, -4));
});

const loadWorkProject = cache(async (slug: string) => {
  const project = await import(`@/content/work/${slug}.mdx`);
  const metadata = project.metadata as WorkMetadata | undefined;

  if (
    !metadata?.title ||
    !metadata.description ||
    !Array.isArray(metadata.tags) ||
    !(metadata.preview || metadata.image?.src)
  ) {
    throw new Error(
      `Export title, description, tags, and either an imported image or a preview component from content/work/${slug}.mdx metadata.`,
    );
  }

  return { ...metadata, slug, Content: project.default as ComponentType };
});

export async function getWorkProject(slug: string) {
  const slugs = await getWorkSlugs();
  return slugs.includes(slug) ? loadWorkProject(slug) : null;
}

export async function getWorkProjects() {
  const slugs = await getWorkSlugs();
  const projects = await Promise.all(slugs.map(loadWorkProject));

  return projects.sort(
    (a, b) =>
      (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER) ||
      a.slug.localeCompare(b.slug),
  );
}
