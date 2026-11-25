"use client";

import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { useRef } from "react";

export function ExpandableImage({ image, alt }: { image: StaticImageData; alt: string }) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        aria-label={`Enlarge image: ${alt}`}
        aria-haspopup="dialog"
        className="block w-full cursor-zoom-in rounded-lg"
        onClick={() => dialog.current?.showModal()}
      >
        <Image src={image} alt={alt} sizes="(min-width: 768px) 672px, (min-width: 640px) calc(100vw - 6rem), calc(100vw - 2.5rem)" className={cn("mx-auto rounded-lg border border-border object-contain", image.width >= image.height ? "h-auto w-full" : "max-h-[70svh] w-auto")} />
      </button>
      <dialog ref={dialog} aria-label={alt} className="fixed inset-0 m-auto max-h-[96dvh] max-w-[96vw] rounded-lg border bg-background p-3 text-foreground backdrop:bg-black/75">
        <form method="dialog" className="mb-2 text-right">
          <button className="rounded px-3 py-1 text-sm font-medium">Close</button>
        </form>
        <Image src={image} alt={alt} sizes="96vw" className="max-h-[80dvh] w-auto object-contain" />
      </dialog>
    </>
  );
}
