import Container from "@/components/container";
import CopyEmailButton from "./copy-email-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const footerButtonClassName =
  "rounded-[18px] py-1.5 text-base font-normal text-muted-foreground";

const links = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/lance-ellis",
  },
] as const;

const Footer = ({ className }: { className?: string }) => {
  return (
    <footer>
      <Container className={cn("py-3", className)}>
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          <div>
            <p className="text-muted-foreground whitespace-nowrap">
              © {new Date().getFullYear()}
            </p>
          </div>

          <nav aria-label="Footer links" className="flex gap-3">
            <CopyEmailButton variant="ghost" className={footerButtonClassName}>
              Email
            </CopyEmailButton>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  footerButtonClassName,
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
