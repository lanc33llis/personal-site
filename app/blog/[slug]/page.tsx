import { socialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Container from "@/components/container";
import { formatPostDate, getPost, getPostSlugs } from "@/lib/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.metadata.title,
    ...socialMetadata({
      title: post.metadata.title,
      description: post.metadata.description,
      path: `/blog/${slug}`,
      article: true,
      publishedTime: post.metadata.publishedAt,
    }),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const { Content, metadata } = post;

  return (
    <article>
      <header className="border-b">
        <Container className="border-x py-0">
          <div className="grid min-h-[52svh] lg:grid-cols-12">
            <aside className="flex items-center justify-between gap-6 border-b py-8 lg:col-span-3 lg:flex-col lg:items-start lg:border-r lg:border-b-0 lg:py-10 lg:pr-10">
              <p className="font-pixel text-5xl leading-none sm:text-6xl">
                POST
              </p>
              <Link
                href="/blog"
                className="inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                All writing
              </Link>
            </aside>

            <div className="flex flex-col justify-center py-12 lg:col-span-9 lg:px-12 lg:py-16">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {metadata.category} · {formatPostDate(metadata.publishedAt)} ·{" "}
                {metadata.readingTime}
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-[0.95] tracking-normal sm:text-5xl lg:text-6xl">
                {metadata.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                {metadata.description}
              </p>
            </div>
          </div>
        </Container>
      </header>

      <Container className="py-0">
        <div className="mx-auto max-w-4xl border-x px-5 py-12 sm:px-12 sm:py-20">
          <Content />
        </div>
      </Container>
    </article>
  );
}
