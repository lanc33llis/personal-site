"use client";

import { Provider } from "jotai";
import ozef, { type OzefInputProps } from "ozef";
import { useState, useSyncExternalStore } from "react";
import { z } from "zod";
import {
  OzefField,
  OzefPreviewFields,
  ozefPreviewClassName,
  ozefPreviewDefaults,
} from "./ozef-preview-fields";

export function OzefPreviewInput({
  label,
  field,
  inputProps,
}: OzefInputProps & { label: string }) {
  return <OzefField label={label} error={field?.error} inputProps={inputProps} />;
}

const ExampleForm = ozef({
  ariaLabel: "Ozef example form",
  schema: z.object({
    firstName: z.string().trim().min(1, "Enter a first name."),
    lastName: z.string().trim().min(1, "Enter a last name."),
    email: z.email("Enter a valid email address."),
  }),
  defaults: ozefPreviewDefaults,
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
        className={ozefPreviewClassName}
        noValidate
        autoComplete="off"
        onChange={() => setSubmitted(false)}
        onSubmit={() => setSubmitted(true)}
      >
        <OzefPreviewFields
          firstName={<ExampleForm.Field name="firstName" label="First name" />}
          lastName={<ExampleForm.Field name="lastName" label="Last name" />}
          email={<ExampleForm.Field name="email" label="Email" />}
          disabled={!hydrated}
          submitted={submitted}
        />
      </ExampleForm>
    </Provider>
  );
}
