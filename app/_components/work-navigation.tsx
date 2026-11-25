"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { createWorkLens } from "@/lib/work-lens";

type WorkGalleryOrigin = { slug: string; top: number };

let openingPosition: WorkGalleryOrigin | null = null;
let currentWorkOrigin: WorkGalleryOrigin | null = null;
let galleryReturnTop: number | null = null;

const previewSize = 160;
const previewPageSize = { width: 1160, height: 1340 };
const previewScale = 0.27;
const previewTravelX = (previewPageSize.width * previewScale - previewSize) / 2;
const previewTravelY = (previewPageSize.height * previewScale - previewSize) / 2;

function previewPosition(x: number, y: number) {
  const gap = 16;
  // Measure the gap from the circular rim along the diagonal.
  const rimOffset = (previewSize / 2) * (1 - Math.SQRT1_2);
  const offset = gap - rimOffset;
  return {
    left: x + offset,
    top: y - previewSize - offset,
  };
}

function previewPlacement(card: DOMRect, x: number, y: number) {
  const relativeX = Math.min(1, Math.max(0, (x - card.left) / card.width));
  const relativeY = Math.min(1, Math.max(0, (y - card.top) / card.height));
  const panX = (1 - 2 * relativeX) * previewTravelX;
  const panY = (1 - 2 * relativeY) * previewTravelY;

  return {
    ...previewPosition(x, y),
    offset: [panX, panY] as const,
    pan: `translate3d(${panX}px, ${panY}px, 0)`,
  };
}

type WorkPreview = ReturnType<typeof previewPlacement> & { closing: boolean };

export function WorkCardLink({
  slug,
  children,
  stretch = false,
}: {
  slug: string;
  children: ReactNode;
  stretch?: boolean;
}) {
  const href = `/work/${slug}`;
  const [preview, setPreview] = useState<WorkPreview | null>(null);
  const reduceMotion = useReducedMotion();
  const previewRef = useRef<HTMLDivElement>(null);
  const previewPageRef = useRef<HTMLDivElement>(null);
  const previewFrameRef = useRef<HTMLIFrameElement>(null);
  const lensCanvasRef = useRef<HTMLCanvasElement>(null);
  const lensRenderer = useRef<Awaited<ReturnType<typeof createWorkLens>>>(null);
  const pageOffset = useRef<readonly [number, number]>([0, 0]);
  const followPointer = useRef(false);
  const previewOpen = preview !== null;

  useEffect(() => {
    const iframe = previewFrameRef.current;
    const canvas = lensCanvasRef.current;
    if (!previewOpen || !iframe || !canvas || !("gpu" in navigator)) return;

    let active = true;
    let started = false;
    const renderPreview = () => {
      const page = iframe.contentDocument;
      if (started || page?.readyState !== "complete" || page.location.pathname !== href) return;
      started = true;

      void import("@/lib/work-lens")
        .then(({ createWorkLens }) => createWorkLens(canvas, page, previewSize, previewPageSize, previewScale))
        .then((renderer) => {
          if (!active) {
            renderer.dispose();
            return;
          }
          lensRenderer.current = renderer;
          renderer.move(pageOffset.current);
        })
        .catch(() => {
          // The live page stays visible if capture or WebGPU is unavailable.
        });
    };

    iframe.addEventListener("load", renderPreview);
    renderPreview();
    return () => {
      active = false;
      iframe.removeEventListener("load", renderPreview);
      lensRenderer.current?.dispose();
      lensRenderer.current = null;
    };
  }, [href, previewOpen]);

  const previewBounds = (link: HTMLAnchorElement) =>
    (stretch ? link.closest("article") ?? link : link).getBoundingClientRect();

  const openPreview = (card: DOMRect, x: number, y: number) => {
    const placement = previewPlacement(card, x, y);
    pageOffset.current = placement.offset;
    setPreview({ ...placement, closing: false });
  };

  const closePreview = () => {
    followPointer.current = false;
    setPreview((current) => {
      if (reduceMotion || !current) return null;
      return current.closing ? current : { ...current, closing: true };
    });
  };

  return (
    <>
      <Link
        id={`work-${slug}`}
        href={href}
        transitionTypes={["open-work"]}
        onNavigate={() => {
          setPreview(null);
          openingPosition = { slug, top: window.scrollY };
        }}
        onPointerEnter={(event) => {
          if (event.pointerType !== "mouse") return;
          followPointer.current = !reduceMotion;
          openPreview(
            previewBounds(event.currentTarget),
            event.clientX,
            event.clientY,
          );
        }}
        onPointerMove={(event) => {
          const lens = previewRef.current;
          const page = previewPageRef.current;
          if (!lens || !page || !followPointer.current || event.pointerType !== "mouse") return;

          const position = previewPlacement(
            previewBounds(event.currentTarget),
            event.clientX,
            event.clientY,
          );
          lens.style.left = `${position.left}px`;
          lens.style.top = `${position.top}px`;
          page.style.transform = position.pan;
          pageOffset.current = position.offset;
          lensRenderer.current?.move(position.offset);
        }}
        onPointerLeave={closePreview}
        onFocus={(event) => {
          if (!event.currentTarget.matches(":focus-visible")) return;
          const card = previewBounds(event.currentTarget);
          openPreview(card, card.left + Math.min(160, card.width / 2), card.top + 48);
        }}
        onBlur={closePreview}
        onKeyDown={(event) => {
          if (event.key === "Escape") closePreview();
        }}
        aria-labelledby={`work-title-${slug}`}
        className={cn(
          "group block rounded-md",
          stretch
            ? "after:absolute after:inset-0 after:z-10 after:rounded-md after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-ring"
            : "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        )}
      >
        {children}
      </Link>
      {preview && (
        <motion.div
          ref={previewRef}
          aria-hidden="true"
          inert
          initial={reduceMotion ? false : "closed"}
          animate={preview.closing ? "closed" : "open"}
          variants={{
            open: { scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
            closed: { scale: 0, transition: { duration: 0.16, ease: "easeIn" } },
          }}
          onAnimationComplete={(variant) => {
            if (variant === "closed") setPreview((current) => (current?.closing ? null : current));
          }}
          className="pointer-events-none fixed z-50 isolate origin-center overflow-hidden rounded-full bg-background/85 shadow-[0_3px_8px_1px_rgb(15_23_42_/_0.25)]"
          style={{
            left: preview.left,
            top: preview.top,
            width: previewSize,
            height: previewSize,
          }}
        >
          <div
            ref={previewPageRef}
            className="absolute inset-0 motion-safe:transition-transform motion-safe:duration-100 motion-safe:ease-out"
            style={{ transform: preview.pan }}
          >
            <iframe
              ref={previewFrameRef}
              title="Project page preview"
              src={href}
              sandbox="allow-same-origin"
              tabIndex={-1}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
              style={{ ...previewPageSize, scale: previewScale }}
            />
          </div>
          <div
            className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_32%_7%,rgb(255_255_255_/_0.12),transparent_33%),radial-gradient(ellipse_at_80%_98%,rgb(255_255_255_/_0.06),transparent_37%)]"
          />
          <canvas ref={lensCanvasRef} className="absolute inset-0 size-full" />
          <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_2px_rgb(255_255_255_/_0.15),inset_0_0_0_1px_rgb(148_163_184_/_0.08),inset_0_-1px_2px_rgb(15_23_42_/_0.02)]" />
        </motion.div>
      )}
    </>
  );
}

export function WorkReturnLink({ slug }: { slug: string }) {
  const router = useRouter();

  useLayoutEffect(() => {
    if (openingPosition?.slug === slug) {
      window.history.replaceState(
        { ...window.history.state, workGalleryOrigin: openingPosition },
        "",
      );
      openingPosition = null;
    }

    const origin = window.history.state?.workGalleryOrigin as
      | WorkGalleryOrigin
      | undefined;
    if (origin?.slug !== slug) return;

    currentWorkOrigin = origin;
    return () => {
      if (currentWorkOrigin === origin) currentWorkOrigin = null;
    };
  }, [slug]);

  return (
    <Link
      href="/#selected-work"
      transitionTypes={["close-work"]}
      onNavigate={(event) => {
        if (window.history.state?.workGalleryOrigin?.slug === slug) {
          event.preventDefault();
          router.back();
        }
      }}
      className="mb-5 inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <ArrowLeft aria-hidden="true" className="size-4" />
      Back
    </Link>
  );
}

export function WorkHistoryNavigation() {
  const router = useRouter();

  useLayoutEffect(() => {
    const handleGalleryReturn = (event: PopStateEvent) => {
      const origin = currentWorkOrigin;
      if (!origin || !event.isTrusted || window.location.pathname !== "/") return;

      if (
        !document.startViewTransition ||
        event.hasUAVisualTransition ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        galleryReturnTop = origin.top;
        return;
      }

      event.stopImmediatePropagation();
      const destination = new URL(window.location.href);
      const detailTop = window.scrollY;

      // The browser already traversed to this entry. Update its route through
      // the animated navigation path after the native popstate has finished.
      window.setTimeout(() => {
        if (window.location.href !== destination.href) return;

        galleryReturnTop = origin.top;
        // History may apply the gallery's scroll while the detail is still visible.
        window.scrollTo({ top: detailTop, behavior: "instant" });
        router.replace(destination.pathname + destination.search + destination.hash, {
          scroll: false,
          transitionTypes: ["close-work"],
        });
      }, 0);
    };

    window.addEventListener("popstate", handleGalleryReturn, true);
    return () => {
      window.removeEventListener("popstate", handleGalleryReturn, true);
    };
  }, [router]);

  return null;
}

export function RestoreWorkPosition() {
  useLayoutEffect(() => {
    if (galleryReturnTop === null) return;

    window.scrollTo({ top: galleryReturnTop, behavior: "instant" });
    galleryReturnTop = null;
  }, []);

  return null;
}
