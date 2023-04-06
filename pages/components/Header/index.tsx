import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { useRouter } from "next/router";

interface HeaderProps {
  forceOpen?: boolean;
}

type NavLink = [label: string, href: string];
const navLinks: NavLink[] = [
  ["About", "/about"],
  ["Projects", "/projects"],
];

const Header = ({ forceOpen }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", function me() {
      setIsOpen(true);
      window.removeEventListener("scroll", me);
    });
  }, []);

  return (
    <LayoutGroup>
      <style jsx global>{`
        body {
          /* here we make the color transition */
          transition: border-color 0.5s ease-in-out;
          /* make this element do the scrolling */
          border-color: ${isOpen || forceOpen
            ? "rgba(0,0,0,.1)"
            : "rgba(0, 0, 0, 0.0)"};
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
      <motion.header
        initial={{
          opacity: forceOpen ? 1 : 0,
          y: forceOpen ? -10 : -100,
        }}
        animate={{
          opacity: isOpen || forceOpen ? 1 : 0,
          y: isOpen || forceOpen ? -10 : -100,
        }}
        transition={{ duration: 1, type: "spring" }}
        className={`fixed top-0 left-0 z-50 flex justify-between w-full px-8 pt-8 pb-[calc(2rem-10px)] sm:px-16 lg:px-24 backdrop-blur-sm bg-white bg-opacity-40`}
      >
        <div>
          <Link href="/" passHref scroll={false}>
            <a className={`py-1 ${router.asPath === "/" ? "squiggle" : ""}`}>
              Lance Ellis
            </a>
          </Link>
        </div>
        <div>
          {navLinks.map(([label, href]) => (
            <Link href={href} key={label} passHref scroll={false}>
              <a
                className={`py-1  ml-12 transition-color hover:text-zinc-700 transition-colors ${
                  router.asPath.split("#")[0] === href ? "squiggle" : ""
                }`}
              >
                {label}
              </a>
            </Link>
          ))}
        </div>
      </motion.header>
    </LayoutGroup>
  );
};

export default Header;
