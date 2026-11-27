"use client";

import dynamic from "next/dynamic";

export const OzefPreview = dynamic(() =>
  import("./ozef-preview").then((module) => module.OzefPreview),
);

export const OzefPlayground = dynamic(() =>
  import("./ozef-playground").then((module) => module.OzefPlayground),
);
