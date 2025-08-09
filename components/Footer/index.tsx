import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  return (
    <div
      className={`flex select-none leading-none text-muted-foreground flex-col p-8 w-full lg:text-sm text-xs`}
    >
      <div className="flex justify-between">
        <span className="select-text">Lance Ellis</span>

        <Link
          href="https://www.linkedin.com/in/lance-ellis"
          className="hover:text-foreground transition-colors"
        >
          LinkedIn
        </Link>
      </div>
      <div className="flex justify-between">
        <span>© 2025</span>
        <Link
          href="https://github.com/lanc33llis"
          className="hover:text-foreground transition-colors"
        >
          GitHub
        </Link>
      </div>
    </div>
  );
};

export default Footer;
