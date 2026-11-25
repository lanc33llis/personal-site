import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import portfolioCard from "@/content/social/portfolio.jpg";

export function socialMetadata({
  title,
  description,
  path,
  image = portfolioCard,
  alt = "Lance Ellis, design engineer, alongside blue fluted glass.",
  article = false,
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  image?: StaticImageData;
  alt?: string;
  article?: boolean;
  publishedTime?: string;
}): Metadata {
  const images = [{ url: new URL(image.src, "https://lanc3.dev"), width: image.width, height: image.height, alt }];
  return {
    description,
    alternates: { canonical: path },
    openGraph: {
      ...(article ? { type: "article", publishedTime } : { type: "website" }),
      siteName: "Lance Ellis",
      locale: "en_US",
      url: path,
      title,
      description,
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
