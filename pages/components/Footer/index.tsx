import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  return (
    <div
      className={`flex select-none leading-none text-zinc-400 flex-col mt-24 pt-12 pb-4 sm:pb-16 lg:pb-24 w-full mb-24 px-4 sm:px-16 lg:px-24`}
    >
      <div>
        <span className="inline-block select-text w-[600px]">Lance Ellis</span>
        <div className="inline-block w-[600px]">
          <Link
            href="https://www.linkedin.com/in/lance-ellis"
            className="hover:text-black transition-colors"
          >
            LinkedIn
          </Link>
        </div>
        <span>Austin, 2024</span>
      </div>
      <div>
        <span className="inline-block select-text w-[600px]">© 2024</span>
        <div className="inline-block w-[600px]">
          <Link
            href="https://github.com/lanc33llis"
            className="hover:text-black transition-colors"
          >
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
