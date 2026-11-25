import Link from "next/link";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";

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
        <nav aria-label="Primary navigation">
          <Button asChild variant="outline" size="sm" className="rounded-xs">
            <Link href="/blog">Blog</Link>
          </Button>
        </nav>
      </Container>
    </header>
  );
}
