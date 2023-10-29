import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { useRouter } from "next/router";

interface HeaderProps {
  forceOpen?: boolean;
}

type NavLink = [label: string, href: string];
const navLinks: NavLink[] = [
  // ["About", "/about"],
  // ["Projects", "/projects"],
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
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: black;
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

        ::-webkit-scrollbar-track {
          background: white;
        }
      `}</style>
      <motion.header
        initial={{
          opacity: forceOpen ? 1 : 0,
          y: forceOpen ? 0 : -100,
        }}
        animate={{
          opacity: isOpen || forceOpen ? 1 : 0,
          y: isOpen || forceOpen ? 0 : -100,
        }}
        transition={{ duration: 1, type: "spring" }}
        className={`fixed top-0 left-0 z-50 flex justify-between w-full px-8 pt-8 pb-[calc(2rem-10px)] sm:px-16 lg:px-24`}
      >
        <div>
          <Link href="/" passHref scroll={false}>
            <a className={`py-1 ${router.asPath === "/" ? "" : ""}`}>
              Lance Ellis
            </a>
          </Link>
        </div>
        <div>
          {navLinks.map(([label, href]) => (
            <Link href={href} key={label} passHref scroll={false}>
              <a
                className={`py-1  ml-12 transition-color ${
                  router.asPath.split("#")[0] === href ? "" : ""
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
