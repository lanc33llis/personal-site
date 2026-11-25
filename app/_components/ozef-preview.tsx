"use client";

import { Provider } from "jotai";
import ozef, { type OzefInputProps } from "ozef";
import { useId, useState, useSyncExternalStore } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function OzefPreviewInput({
  label,
  field,
  inputProps,
}: OzefInputProps & { label: string }) {
  const id = useId();
  const error = field?.error;
  const errorId = `${id}-error`;

  return (
    <div className="grid min-w-0 gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        {...inputProps}
        id={id}
        className="bg-white dark:bg-white dark:text-neutral-950"
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

const ExampleForm = ozef({
  ariaLabel: "Ozef example form",
  schema: z.object({
    firstName: z.string().trim().min(1, "Enter a first name."),
    lastName: z.string().trim().min(1, "Enter a last name."),
    email: z.email("Enter a valid email address."),
  }),
  defaults: {
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
  },
  Input: OzefPreviewInput,
});

function subscribeToHydration() {
  return () => {};
}

export function OzefPreview() {
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const [submitted, setSubmitted] = useState(false);

  return (
    <Provider>
      <ExampleForm
        className="w-full max-w-72"
        noValidate
        autoComplete="off"
        onChange={() => setSubmitted(false)}
        onSubmit={() => setSubmitted(true)}
      >
        <fieldset className="grid min-w-0 gap-4" disabled={!hydrated}>
          <div className="grid grid-cols-2 items-start gap-3">
            <ExampleForm.Field name="firstName" label="First name" />
            <ExampleForm.Field name="lastName" label="Last name" />
          </div>
          <ExampleForm.Field name="email" label="Email" />
          <div className="flex items-center gap-3">
            <Button className="rounded-md" type="submit">
              Submit
            </Button>
            <p role="status" className="text-sm text-muted-foreground">
              {submitted ? "Submitted" : null}
            </p>
          </div>
        </fieldset>
      </ExampleForm>
    </Provider>
  );
}
