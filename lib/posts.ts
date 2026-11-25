import "server-only";

import { readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

export type PostMetadata = {
  title: string;
  description: string;
  publishedAt: string;
  category: string;
  readingTime: string;
};

export type PostSummary = PostMetadata & {
  slug: string;
};

const postsDirectory = path.join(process.cwd(), "content", "blog");

export async function getPostSlugs() {
  const files = await readdir(postsDirectory);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export const getPost = cache(async (slug: string) => {
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return null;
  }

  try {
    const post = await import(`@/content/blog/${slug}.mdx`);

    return {
      Content: post.default,
      metadata: post.metadata as PostMetadata,
      slug,
    };
  } catch {
    return null;
  }
});

export async function getAllPosts(): Promise<PostSummary[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPost(slug)));

  return posts
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .map(({ metadata, slug }) => ({ ...metadata, slug }))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function formatArchiveDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  })
    .format(new Date(date))
    .toUpperCase();
}
