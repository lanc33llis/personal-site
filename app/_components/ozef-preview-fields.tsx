import { useId, type ComponentProps, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ozefPreviewDefaults = {
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.com",
};

export const ozefPreviewClassName = "w-full max-w-72";

export function OzefField({
  label,
  error,
  inputProps,
}: {
  label: string;
  error?: string;
  inputProps: ComponentProps<typeof Input>;
}) {
  const id = useId();
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

export function OzefPreviewFields({
  firstName,
  lastName,
  email,
  disabled,
  submitted,
}: {
  firstName: ReactNode;
  lastName: ReactNode;
  email: ReactNode;
  disabled?: boolean;
  submitted?: boolean;
}) {
  return (
    <fieldset className="grid min-w-0 gap-4" disabled={disabled}>
      <div className="grid grid-cols-2 items-start gap-3">
        {firstName}
        {lastName}
      </div>
      {email}
      <div className="flex items-center gap-3">
        <Button className="rounded-md" type="submit">
          Submit
        </Button>
        <p role="status" className="text-sm text-muted-foreground">
          {submitted ? "Submitted" : null}
        </p>
      </div>
    </fieldset>
  );
}
