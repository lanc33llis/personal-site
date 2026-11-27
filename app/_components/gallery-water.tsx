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

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let nearViewport = false;

    function updatePlayback() {
      setCanAnimate(nearViewport && !document.hidden && !motion.matches);
    }

    const observer = new IntersectionObserver(([entry]) => {
      nearViewport = entry.isIntersecting && entry.boundingClientRect.width > 0;
      updatePlayback();
    }, { rootMargin: "160px 0px" });
    observer.observe(animation);
    document.addEventListener("visibilitychange", updatePlayback);
    motion.addEventListener("change", updatePlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      motion.removeEventListener("change", updatePlayback);
    };
  }, []);

  return (
    <div className="relative h-full overflow-hidden rounded-sm bg-white bg-cover bg-center motion-reduce:bg-[image:var(--water-texture)]"
      style={{ "--water-texture": `url(${assetUrl("/fluted-glass.webp")})` } as CSSProperties}
    >
      <div ref={animationRef} className="absolute inset-0 motion-reduce:hidden">
        {canAnimate && <WaterBackground />}
      </div>
    </div>
  );
}
