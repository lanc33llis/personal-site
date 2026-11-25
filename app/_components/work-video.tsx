"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

export function WorkVideo(props: ComponentPropsWithoutRef<"video">) {
  const ref = useRef<HTMLVideoElement>(null);

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

  return <video ref={ref} muted playsInline preload="none" {...props} />;
}
