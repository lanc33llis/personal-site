"use client";
import { Button } from "@/components/ui/button";
import { ComponentPropsWithoutRef } from "react";
import { toast } from "sonner";

const CopyEmailButton = (props: ComponentPropsWithoutRef<typeof Button>) => {
  return (
    <Button
      {...props}
      onClick={async (e) => {
        props.onClick?.(e);
        await navigator.clipboard.writeText("lanc33llis@gmail.com");
        toast.success("Email copied to clipboard!");
      }}
    ></Button>
  );
};

export default CopyEmailButton;
