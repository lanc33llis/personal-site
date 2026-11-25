import type { NextConfig } from "next";

import { readdirSync } from "node:fs";
import { assetUrl, deviceWidths, imageWidths } from "./lib/cdn-assets.mjs";

const assetOrigin = process.env.NEXT_PUBLIC_ASSET_ORIGIN ??
  (process.env.NODE_ENV === "production" ? "https://lanc3-portfolio-assets.pages.dev" : "");

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_ASSET_ORIGIN: assetOrigin },
  ...(assetOrigin && {
    images: {
      loader: "custom" as const,
      loaderFile: "./lib/cdn-image-loader.ts",
      deviceSizes: deviceWidths,
      imageSizes: imageWidths,
    },
    async redirects() {
      return readdirSync("public", { recursive: true, withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => "/" + [...entry.parentPath.split("/").slice(1), entry.name].join("/"))
        .filter((source) => !source.split("/").some((part) => part.startsWith(".")))
        .map((source) => ({ source, destination: assetUrl(source, assetOrigin), permanent: false }));
    },
  }),
  reactCompiler: true,
};

export default nextConfig;
