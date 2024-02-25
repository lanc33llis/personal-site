import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  return (
    <div
      className={`flex select-none leading-none text-zinc-400 flex-col pt-12 pb-4 sm:pb-16 lg:pb-20 w-full px-4 sm:px-16 lg:px-24`}
    >
      <div className="flex justify-between">
        <span className="select-text">Lance Ellis</span>

        <Link
          href="https://www.linkedin.com/in/lance-ellis"
          className="hover:text-black transition-colors"
        >
          LinkedIn
        </Link>
      </div>
      <div className="flex justify-between">
        <span>© 2024</span>
        <Link
          href="https://github.com/lanc33llis"
          className="hover:text-black transition-colors"
        >
          GitHub
        </Link>
      </div>
    </div>
  );
};

export default Footer;
