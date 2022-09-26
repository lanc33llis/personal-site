import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type NavLink = [label: string, href: string];
const navLinks: NavLink[] = [
  ["about", "/about"],
  ["contact", "/contact"],
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", function me() {
      setIsOpen(true);
      window.removeEventListener("scroll", me);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -100 }}
      transition={{ duration: 1, type: "spring" }}
      className={`px-4 lg:px-16 py-2 fixed top-0 left-0 z-50 bg-white w-full border-gray-300 ${
        isOpen ? "border-b" : ""
      }`}
    >
      <style jsx global>{`
        body {
          /* here we make the color transition */
          transition: border-color 0.5s ease-in-out;
          /* make this element do the scrolling */
          border-color: ${isOpen ? "rgba(0,0,0,.1)" : "rgba(0, 0, 0, 0.0)"};
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-thumb {
          border-radius: 10px;
        }

        ::-webkit-scrollbar,
        ::-webkit-scrollbar-thumb,
        ::-webkit-scrollbar-corner {
          /* add border to act as background-color */
          border-right-style: inset;
          /* sum viewport dimensions to guarantee border will fill scrollbar */
          border-right-width: calc(100vw + 100vh);
          /* inherit border-color to inherit transitions */
          border-color: inherit;
        }
      `}</style>
      <Link href="/" passHref>
        <a>lance ellis</a>
      </Link>
      <span className="ml-1 text-gray-500">-</span>
      {navLinks.map(([label, href]) => (
        <Link href={href} key={label} passHref>
          <a className="ml-1 text-gray-500 hover:text-black transition-colors">
            {label}
          </a>
        </Link>
      ))}
    </motion.div>
  );
};

export default Header;
