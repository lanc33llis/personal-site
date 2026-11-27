"use client";

import { assetUrl } from "@/lib/cdn-assets.mjs";
import { Water } from "@paper-design/shaders-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

const GRID_TARGET_SIZE = 20;
const PIXEL_CLEAR_ROW_DELAY = 0.08;
const PIXEL_FILL_ROW_DELAY = 0.065;
const PIXEL_TRANSITION_DURATION = 0.42;
const PIXEL_PAUSE_BEFORE_REVERSE = 0.75;
const PIXEL_PAUSE_BEFORE_LOOP = 0.45;
const PIXEL_CLEAR_MAX_STAGGER = 0.69;
const PIXEL_FILL_MAX_STAGGER = 0.44;

type GridStyle = CSSProperties & {
  "--grid-cell-x": string;
  "--grid-cell-y": string;
};

type PixelStyle = CSSProperties & {
  transitionDelay: string;
  transitionDuration: string;
  transitionTimingFunction: string;
};

type PixelPhase = "firstReveal" | "clearing" | "transparentPause" | "filling" | "whitePause";

type GridState = {
  columns: number;
  rows: number;
  style: GridStyle;
};

function getPixelStyle(
  index: number,
  columns: number,
  rows: number,
  phase: PixelPhase,
): PixelStyle {
  const seed = (index * 9301 + 49297) % 233280;
  const row = Math.floor(index / columns);
  const column = index % columns;
  const isFilling = phase === "filling" || phase === "whitePause";
  const rowDelay = isFilling
    ? (rows - row - 1) * PIXEL_FILL_ROW_DELAY
    : row * PIXEL_CLEAR_ROW_DELAY;
  const stagger = isFilling
    ? ((seed + column * 17) % 45) / 100
    : (seed % 70) / 100;

  return {
    transitionDelay: `${rowDelay + stagger}s`,
    transitionDuration: `${PIXEL_TRANSITION_DURATION}s`,
    transitionTimingFunction: phase === "firstReveal" ? "steps(1, start)" : "steps(1, end)",
  };
}

export function WaterBackground({
  className,
  revealImmediately = false,
  revealReady = true,
  texture = assetUrl("/fluted-glass.webp"),
}: {
  className?: string;
  revealImmediately?: boolean;
  revealReady?: boolean;
  texture?: HTMLImageElement | string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pixelPhase, setPixelPhase] = useState<PixelPhase>("whitePause");
  const [waterMoving, setWaterMoving] = useState(!revealImmediately);
  const [grid, setGrid] = useState<GridState>({
    columns: 0,
    rows: 0,
    style: {
      "--grid-cell-x": `${GRID_TARGET_SIZE}px`,
      "--grid-cell-y": `${GRID_TARGET_SIZE}px`,
    },
  });

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const updateGrid = ({ width, height }: DOMRectReadOnly) => {
      const columns = Math.max(1, Math.round(width / GRID_TARGET_SIZE));
      const rows = Math.max(1, Math.round(height / GRID_TARGET_SIZE));

      setGrid({
        columns,
        rows,
        style: {
          "--grid-cell-x": `${(width + 1) / columns}px`,
          "--grid-cell-y": `${(height + 1) / rows}px`,
        },
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

  useEffect(() => {
    if (grid.rows === 0 || !revealReady) {
      return;
    }

    const clearDuration =
      (grid.rows - 1) * PIXEL_CLEAR_ROW_DELAY +
      PIXEL_CLEAR_MAX_STAGGER +
      PIXEL_TRANSITION_DURATION;
    const fillDuration =
      (grid.rows - 1) * PIXEL_FILL_ROW_DELAY +
      PIXEL_FILL_MAX_STAGGER +
      PIXEL_TRANSITION_DURATION;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const schedule = (callback: () => void, delay: number) => {
      timers.push(setTimeout(callback, delay * 1000));
    };

    function clear(phase: "firstReveal" | "clearing" = "clearing") {
      setPixelPhase(phase);
      schedule(() => {
        setPixelPhase("transparentPause");
        schedule(fill, PIXEL_PAUSE_BEFORE_REVERSE);
      }, clearDuration);
    }

    function fill() {
      setPixelPhase("filling");
      schedule(() => {
        setPixelPhase("whitePause");
        schedule(clear, PIXEL_PAUSE_BEFORE_LOOP);
      }, fillDuration);
    }

    let revealFrame: number | undefined;
    if (revealImmediately) {
      // Let the white grid paint before changing its opacity.
      revealFrame = requestAnimationFrame(() => {
        revealFrame = requestAnimationFrame(() => clear("firstReveal"));
      });
    } else {
      schedule(clear, PIXEL_PAUSE_BEFORE_LOOP);
    }

    return () => {
      if (revealFrame !== undefined) cancelAnimationFrame(revealFrame);
      timers.forEach(clearTimeout);
    };
  }, [grid.rows, revealImmediately, revealReady]);

  useEffect(() => {
    if (pixelPhase !== "firstReveal" || waterMoving) return;

    // Show the first opening tiles before starting continuous shader rendering.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setWaterMoving(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [pixelPhase, waterMoving]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-hidden", className)}
    >
      <div className="absolute inset-0">
        <Water
          width={"100%"}
          height={"100%"}
          image={texture}
          colorBack="#8f8f8f"
          colorHighlight="#ffffff"
          highlights={0.4}
          layering={0}
          edges={0}
          waves={0}
          caustic={0.2}
          size={0.7}
          speed={waterMoving ? 0.1 : 0}
          scale={1.5}
          fit="cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-100 mix-blend-overlay"
        style={{
          background: `url(${assetUrl("/grain.svg")})`,
        }}
      />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 grid overflow-hidden",
          grid.columns === 0 && "bg-white",
        )}
        style={{
          gridTemplateColumns: `repeat(${grid.columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${grid.rows}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: grid.columns * grid.rows }, (_, index) => (
          <span
            key={index}
            className={cn(
              "bg-white transition-[opacity] ease-linear",
              (pixelPhase === "firstReveal" ||
                pixelPhase === "clearing" ||
                pixelPhase === "transparentPause") &&
                "opacity-0",
              (pixelPhase === "filling" || pixelPhase === "whitePause") &&
                "opacity-100",
            )}
            style={getPixelStyle(index, grid.columns, grid.rows, pixelPhase)}
          />
        ))}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[1px] bg-[linear-gradient(to_right,rgba(255,255,255,0.34)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.34)_1px,transparent_1px)] bg-[size:var(--grid-cell-x)_var(--grid-cell-y)]"
        style={grid.style}
      />
    </div>
  );
}
