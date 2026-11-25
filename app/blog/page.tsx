import Link from "next/link";
import Container from "@/components/container";
import { formatArchiveDate, getAllPosts } from "@/lib/posts";

export default async function BlogPage() {
  const posts = await getAllPosts();
  const postsByYear = posts.reduce<
    Array<{ year: string; posts: typeof posts }>
  >((groups, post) => {
    const year = new Date(post.publishedAt).getUTCFullYear().toString();
    const currentGroup = groups.at(-1);

    if (currentGroup?.year === year) {
      currentGroup.posts.push(post);
    } else {
      groups.push({ year, posts: [post] });
    }

    return groups;
  }, []);

  return (
    <Container className="w-full max-w-5xl py-16 sm:py-24 lg:py-28">
      <h1 className="sr-only">Writing</h1>

      <div className="space-y-20 sm:space-y-24">
        {postsByYear.map((group) => (
          <section key={group.year} aria-labelledby={`year-${group.year}`}>
            <h2
              id={`year-${group.year}`}
              className="font-pixel text-lg leading-none text-foreground sm:text-xl"
            >
              {group.year}
            </h2>

            <ol className="mt-10 sm:mt-12">
              {group.posts.map((post) => (
                <li key={post.slug} className="border-b first:border-t">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-5 px-1 py-6 sm:px-5 sm:py-7"
                  >
                    <h3 className="truncate text-base font-medium tracking-wide text-muted-foreground transition-colors group-hover:text-foreground sm:text-lg">
                      {post.title}
                    </h3>
                    <time
                      dateTime={post.publishedAt}
                      className="font-pixel text-sm leading-none text-muted-foreground transition-colors group-hover:text-foreground sm:text-base"
                    >
                      {formatArchiveDate(post.publishedAt)}
                    </time>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </Container>
  );
}
