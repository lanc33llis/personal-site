"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { assetUrl } from "@/lib/cdn-assets.mjs";
import { WaterBackground } from "@/components/water-background";

export function GalleryWater() {
  const animationRef = useRef<HTMLDivElement>(null);
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    const animation = animationRef.current;
    if (!animation) return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;

      const { width, height } = entry.contentRect;
      setCanAnimate(width > 0 && height > 0);
    });

    observer.observe(animation);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-full overflow-hidden rounded-sm bg-white bg-cover bg-center motion-reduce:bg-[image:var(--water-texture)]"
      style={{ "--water-texture": `url(${assetUrl("/fluted-glass.png")})` } as CSSProperties}
    >
      <div ref={animationRef} className="absolute inset-0 motion-reduce:hidden">
        {canAnimate && <WaterBackground />}
      </div>
    </div>
  );
}
