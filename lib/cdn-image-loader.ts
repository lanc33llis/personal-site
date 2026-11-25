"use client";

import type { ImageLoaderProps } from "next/image";
import { assetUrl, variantPath } from "./cdn-assets.mjs";

export default function cdnImageLoader({ src, width }: ImageLoaderProps) {
  return assetUrl(variantPath(new URL(src, process.env.NEXT_PUBLIC_ASSET_ORIGIN).pathname, width));
}
