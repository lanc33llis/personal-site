"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function HomeHero({ children }: { children: ReactNode }) {
  const hero = useRef<HTMLElement>(null);

  useEffect(() => {
    const setScreenHeight = () => {
      hero.current?.style.setProperty("--phone-screen-height", `${window.screen.height}px`);
    };

    setScreenHeight();
    window.addEventListener("resize", setScreenHeight);
    return () => window.removeEventListener("resize", setScreenHeight);
  }, []);

  return (
    <section
      ref={hero}
      className="flex min-h-svh flex-col max-sm:pointer-coarse:min-h-[max(100lvh,var(--phone-screen-height,100lvh))] lg:h-dvh"
    >
      {children}
    </section>
  );
}
