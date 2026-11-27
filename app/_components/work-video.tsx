"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type WorkVideoProps = ComponentPropsWithoutRef<"video"> & {
  previewPoster?: { image: StaticImageData; sizes: string };
};

export function WorkVideo({ previewPoster, ...props }: WorkVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [posterNeeded, setPosterNeeded] = useState(false);
  const [played, setPlayed] = useState(false);
  const hasPreviewPoster = Boolean(previewPoster);

  useEffect(() => {
    const video = ref.current;
    if (!video || !hasPreviewPoster) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setPosterNeeded(true);
      observer.disconnect();
    }, { rootMargin: "200px 0px" });
    observer.observe(video);
    return () => observer.disconnect();
  }, [hasPreviewPoster]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    function updatePlayback() {
      if (!video) return;
      if (visible && !document.hidden && !motion.matches) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    });
    observer.observe(video);
    motion.addEventListener("change", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", updatePlayback);
      document.removeEventListener("visibilitychange", updatePlayback);
    };
  }, [props.src]);

  const video = (
    <video
      ref={ref}
      muted
      playsInline
      preload="none"
      {...props}
      onPlaying={(event) => {
        if (previewPoster) setPlayed(true);
        props.onPlaying?.(event);
      }}
    />
  );

  if (!previewPoster) return video;

  return (
    <div className={cn("relative", props.className)}>
      {video}
      {posterNeeded && !played && (
        <Image
          src={previewPoster.image}
          alt=""
          fill
          sizes={previewPoster.sizes}
          loading="eager"
          fetchPriority="low"
          className="pointer-events-none object-cover [border-radius:inherit]"
        />
      )}
    </div>
  );
}
