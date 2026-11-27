"use client";

import { useEffect, useRef, useState } from "react";
import { WaterBackground } from "@/components/water-background";
import { assetUrl } from "@/lib/cdn-assets.mjs";

export function HeroWater() {
  const panel = useRef<HTMLDivElement>(null);
  const [headingReady, setHeadingReady] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [inView, setInView] = useState(false);
  const [texture, setTexture] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!motionEnabled || texture) return;

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = assetUrl("/fluted-glass.webp");
    let active = true;

    void image.decode().then(() => {
      if (active) setTexture(image);
    }).catch(() => {
      // Keep the panel white if the texture cannot be decoded.
    });

    return () => { active = false; };
  }, [motionEnabled, texture]);

  useEffect(() => {
    const element = panel.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const heading = panel.current?.closest("section")?.querySelector("h1");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active = true;

    async function syncPlayback() {
      setMotionEnabled(!motion.matches);
      if (motion.matches) {
        setHeadingReady(false);
        return;
      }
      const animations = heading?.getAnimations({ subtree: true }) ?? [];
      await Promise.allSettled(animations.map((animation) => animation.finished));
      if (active && !motion.matches) setHeadingReady(true);
    }

    void syncPlayback();
    motion.addEventListener("change", syncPlayback);
    return () => {
      active = false;
      motion.removeEventListener("change", syncPlayback);
    };
  }, []);

  return (
    <div
      ref={panel}
      className="absolute inset-0 bg-white"
    >
      {motionEnabled && inView && texture && (
        <WaterBackground revealImmediately revealReady={headingReady} texture={texture} />
      )}
    </div>
  );
}
