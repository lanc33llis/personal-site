import Container from "@/components/container";
import CopyEmailButton from "./copy-email-button";
import { buttonVariants } from "@/components/ui/button";

const links = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/lance-ellis",
  },
] as const;

const Footer = () => {
  return (
    <footer className="border-t">
      <Container className="border-x py-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-muted-foreground">
              © {new Date().getFullYear()}
            </p>
          </div>

          <nav aria-label="Footer links" className="flex flex-wrap gap-3">
            <CopyEmailButton variant="outline">Email</CopyEmailButton>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={buttonVariants({ variant: "outline" })}
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
