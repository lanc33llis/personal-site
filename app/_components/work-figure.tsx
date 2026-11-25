import type { ReactNode } from "react";
import type { StaticImageData } from "next/image";
import { ExpandableImage } from "./expandable-image";

type FigureProps = { caption: string } & (
  | { image: StaticImageData; alt: string; placeholder?: never; children?: never }
  | { placeholder: string; image?: never; children?: never }
  | { children: ReactNode; placeholder?: never; image?: never }
);

export function WorkFigure(props: FigureProps) {
  return (
    <figure className="my-8">
      {props.image ? (
        <ExpandableImage image={props.image} alt={props.alt} />
      ) : props.placeholder ? (
        <div className="flex min-h-44 flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/40 p-6 text-center">
          <span className="text-sm font-medium">Asset placeholder</span>
          <span className="max-w-md text-sm text-muted-foreground">{props.placeholder}</span>
        </div>
      ) : props.children}
      <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {props.caption}
      </figcaption>
    </figure>
  );
}
