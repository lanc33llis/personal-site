"use client";

import { useRef, useState } from "react";
import { Provider } from "jotai";
import ozef from "ozef";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { OzefPreviewInput } from "./ozef-preview";

const examples = {
  "Bug report": 'z.object({\n  title: z.string().min(5),\n  steps: z.string().min(10),\n})',
  "Launch signup": 'z.object({\n  email: z.email(),\n  team: z.string().min(2),\n})',
};

function compileForm(source: string, values: Record<string, string>) {
  const body = /^\s*z\.object\(\s*\{([\s\S]*)\}\s*\)\s*;?\s*$/.exec(source)?.[1];
  if (body === undefined) throw Error("Wrap the fields in z.object({ … }).");

  const shape: Record<string, z.ZodString | z.ZodEmail> = {};
  const entries = body.trim().replace(/,\s*$/, "").split(",");
  for (const entry of entries) {
    const match = /^\s*([a-z][a-zA-Z0-9_]*)\s*:\s*z\.(email|string)\(\s*\)(?:\.min\(\s*(\d{1,4})\s*\))?\s*$/.exec(entry);
    if (!match) throw Error("Use a field name followed by z.email() or z.string(), with an optional .min(n).");
    const [, name, kind, minimum] = match;
    if (name in shape || name === "prototype") throw Error("Give each field a unique, non-reserved name.");
    const field = kind === "email" ? z.email("Enter a valid email address.") : z.string();
    shape[name] = minimum ? field.min(Number(minimum), `Enter at least ${Number(minimum)} characters.`) : field;
  }

  const names = Object.keys(shape);
  const defaults = Object.fromEntries(names.map(name => [name, values[name] ?? ""]));
  return { names, Form: ozef({ schema: z.object(shape), defaults, Input: OzefPreviewInput, ariaLabel: "Live schema preview" }) };
}

export function OzefPlayground() {
  const [example, setExample] = useState("Bug report");
  const [source, setSource] = useState(examples["Bug report"]);
  const [preview, setPreview] = useState(() => compileForm(source, {}));
  const [problem, setProblem] = useState("");
  const [result, setResult] = useState("");
  const container = useRef<HTMLDivElement>(null);

  function edit(next: string, reset = false) {
    setSource(next);
    setResult("");
    const inputs = container.current?.querySelectorAll("input") ?? [];
    const values = reset ? {} : Object.fromEntries(Array.from(inputs, input => [input.name, input.value]));
    try {
      setPreview(compileForm(next, values));
      setProblem("");
    } catch (error) {
      setProblem(error instanceof Error ? error.message : "Check the schema.");
    }
  }

  const { Form, names } = preview;
  return (
    <div className="my-6 overflow-hidden rounded-lg border bg-background">
      <div role="group" aria-label="Example schema" className="flex gap-1 border-b p-2">
        {Object.entries(examples).map(([name, schema]) => (
          <button
            key={name}
            type="button"
            aria-pressed={example === name}
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-ring aria-pressed:bg-muted aria-pressed:font-medium aria-pressed:text-foreground"
            onClick={() => {
              if (example === name) return;
              setExample(name);
              edit(schema, true);
            }}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-[1.15fr_1fr]">
        <div className="min-w-0 border-b bg-zinc-50 p-4 text-zinc-900 sm:border-r sm:border-b-0 sm:p-5">
          <label className="grid gap-3">
            <span className="font-mono text-xs text-zinc-600">Zod schema</span>
            <textarea
              value={source}
              onChange={event => edit(event.target.value)}
              spellCheck={false}
              rows={6}
              aria-invalid={!!problem}
              className="w-full resize-y rounded-sm bg-transparent font-mono text-sm leading-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            />
          </label>
          {problem && <p role="status" className="mt-3 text-xs leading-relaxed text-zinc-700">{problem} Showing the last valid form.</p>}
        </div>
        <div ref={container} className="min-w-0 p-4 sm:p-5">
          <p className="mb-4 font-mono text-xs text-muted-foreground">Form preview</p>
          <Provider>
            <Form className="grid gap-4" noValidate onChange={() => setResult("")} onSubmit={data => setResult(JSON.stringify(data, null, 2))}>
              {names.map(name => (
                <Form.Field key={name} name={name} label={name.charAt(0).toUpperCase() + name.slice(1)} />
              ))}
              <Button size="sm" type="submit" className="w-fit rounded-md">Submit</Button>
            </Form>
          </Provider>
        </div>
      </div>
      {result && (
        <div role="status" className="border-t bg-zinc-50 p-4 text-zinc-900 sm:p-5">
          <p className="font-mono text-xs text-zinc-600">Submitted values</p>
          <pre className="mt-2 overflow-x-auto font-mono text-sm leading-6">{result}</pre>
        </div>
      )}
    </div>
  );
}
