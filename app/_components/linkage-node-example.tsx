import "./linkage-edge.css";
import { AlignLeft, Database, Folder, Inbox, Send, Sigma } from "lucide-react";

const inputs = [
  { label: "Customer profile", Icon: Database },
  { label: "Subject", Icon: Folder },
  { label: "Prompt for body", Icon: AlignLeft },
  { label: "Custom Input", Icon: Sigma },
];

const row = "flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-sm";
const port = "absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full border";

export function LinkageNodeExample() {
  return (
    <div className="grid place-items-center overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 px-7 py-12 text-zinc-900">
      <div className="relative w-full max-w-72 rounded-xl border border-zinc-300 bg-white shadow-sm">
        <div className="relative flex items-center justify-between border-b border-zinc-200 px-3 py-2.5 text-sm font-medium">
          <svg aria-hidden="true" width="400" height="2" className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 text-zinc-500">
            <path className="linkage-edge" d="M0 1 H400" />
          </svg>
          <svg aria-hidden="true" width="400" height="2" className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 text-zinc-500">
            <path className="linkage-edge" d="M0 1 H400" />
          </svg>
          <span className={port + " -left-1.5 z-10 border-blue-400 bg-blue-500"} aria-hidden="true" />
          Cold reach customer
          <Send size={16} aria-hidden="true" />
          <span className={port + " -right-1.5 z-10 border-emerald-400 bg-emerald-500"} aria-hidden="true" />
        </div>
        <div className="grid gap-1 rounded-b-xl bg-zinc-50 p-1.5">
          <span className="px-1 text-xs text-zinc-600">Input</span>
          {inputs.map(({ label, Icon }) => (
            <div key={label} className={row}><Icon size={16} aria-hidden="true" />{label}</div>
          ))}
          <span className="px-1 text-xs text-zinc-600">Output</span>
          <div className={row + " relative"}>
            <Inbox size={16} aria-hidden="true" />Email Receipt
            <svg aria-hidden="true" width="64" height="48" viewBox="0 0 64 48" className="pointer-events-none absolute bottom-1/2 left-full overflow-visible text-zinc-500">
              <path d="M0 48 H18 Q26 48 26 40 V16 Q26 8 34 8 H400" className="linkage-edge" />
            </svg>
            <span className={port + " -right-1.5 border-emerald-400 bg-emerald-500"} aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
