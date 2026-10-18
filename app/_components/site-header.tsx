import Link from "next/link";
import Container from "@/components/container";

export default function SiteHeader() {
  return (
    <header className="border-b bg-background">
      <Container className="flex min-h-14 items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="font-medium leading-none text-foreground transition-opacity hover:opacity-60"
        >
          Lance Ellis
        </Link>
      </Container>
    </header>
  );
}
