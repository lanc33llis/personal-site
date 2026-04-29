"use client";

import { Water } from "@paper-design/shaders-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

const GRID_TARGET_SIZE = 20;

type GridStyle = CSSProperties & {
  "--grid-cell-x": string;
  "--grid-cell-y": string;
};

export function WaterBackground({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gridStyle, setGridStyle] = useState<GridStyle>({
    "--grid-cell-x": `${GRID_TARGET_SIZE}px`,
    "--grid-cell-y": `${GRID_TARGET_SIZE}px`,
  });

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const updateGrid = ({ width, height }: DOMRectReadOnly) => {
      const columns = Math.max(1, Math.round(width / GRID_TARGET_SIZE));
      const rows = Math.max(1, Math.round(height / GRID_TARGET_SIZE));

      setGridStyle({
        "--grid-cell-x": `${(width + 1) / columns}px`,
        "--grid-cell-y": `${(height + 1) / rows}px`,
      });
    };

    updateGrid(container.getBoundingClientRect());

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        updateGrid(entry.contentRect);
      }
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-hidden", className)}
    >
      <div className="absolute inset-0">
        <Water
          width={"100%"}
          height={"100%"}
          image="/fluted-glass.png"
          colorBack="#8f8f8f"
          colorHighlight="#ffffff"
          highlights={0.4}
          layering={0}
          edges={0}
          waves={0}
          caustic={0.2}
          size={0.7}
          speed={0.1}
          scale={1.5}
          fit="cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-100 mix-blend-overlay"
        style={{
          background: "url(/grain.svg)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[1px] bg-[linear-gradient(to_right,rgba(255,255,255,0.34)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.34)_1px,transparent_1px)] bg-[size:var(--grid-cell-x)_var(--grid-cell-y)]"
        style={gridStyle}
      />
    </div>
  );
}
