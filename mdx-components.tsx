import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";
import { WorkFigure } from "@/app/_components/work-figure";

const components = {
  WorkFigure,
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-14 scroll-mt-24 text-2xl font-medium tracking-tight sm:text-3xl"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-10 scroll-mt-24 text-xl font-medium tracking-tight"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-6 text-lg leading-8 text-foreground/80" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="font-medium text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="mt-6 list-disc space-y-2 pl-6 text-lg leading-8 text-foreground/80 marker:text-muted-foreground"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mt-6 list-decimal space-y-2 pl-6 text-lg leading-8 text-foreground/80 marker:font-mono marker:text-sm marker:text-muted-foreground"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-8 border-l-2 pl-6 text-xl leading-8 text-foreground/70 italic"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.9em]"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="my-8 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-5 font-mono text-sm leading-6 text-zinc-900 [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className="my-12 border-border" {...props} />
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
