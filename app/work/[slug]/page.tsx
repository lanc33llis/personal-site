import { socialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/app/_components/footer";
import { WorkMedia, WorkTags } from "@/app/_components/work-media";
import { WorkReturnLink } from "@/app/_components/work-navigation";
import Container from "@/components/container";
import { getWorkProject, getWorkSlugs } from "@/lib/work";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getWorkSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getWorkProject(slug);

  if (!project) return {};

  return {
    title: project.title,
    ...socialMetadata({
      title: `${project.title} | Lance Ellis`,
      description: project.description,
      path: `/work/${slug}`,
      image: project.shareImage,
      alt: project.shareImageAlt,
      article: true,
    }),
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const project = await getWorkProject(slug);

  if (!project) notFound();

  const { Content } = project;

  return (
    <div className="mx-auto flex w-full max-w-[90rem] flex-1 flex-col">
      <main className="flex-1">
        <article>
          <Container className="max-w-3xl pt-6 pb-0 sm:pt-8">
            <WorkReturnLink slug={project.slug} />
            <figure>
              <WorkMedia project={project} hero />
              {project.heroCaption && (
                <figcaption className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.heroCaption}
                </figcaption>
              )}
            </figure>
          </Container>

          <Container className="work-details max-w-3xl pt-4 pb-10 sm:pb-16">
            <header>
              <WorkTags tags={project.tags} />
              <h1 className="mt-5 text-4xl leading-none font-medium sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-5 text-xl leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </header>
            <Content />
          </Container>
        </article>
      </main>

      <Footer />
    </div>
  );
}
