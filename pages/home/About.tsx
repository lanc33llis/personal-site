import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

import SpacePic from "../../public/joel-filipe-QwoNAhbmLLo-unsplash.jpg";
import ComputerPic from "../../public/andras-vas-Bd7gNnWJBkU-unsplash.jpg";

import {
  Prism as SyntaxHighlighter,
  type SyntaxHighlighterProps,
} from "react-syntax-highlighter";

import hyperlineLight from "../../styles/hyperline-light";

const snippet = `I am a web developer and designer skilled in multiple frameworks 
and languages, including Next.js, Spring, and Flask. I take 
pride in crafting innovative digital products using the latest 
technologies. In addition to development, I have a passion for 
designing  user-friendly and aesthetically pleasing interfaces.

I'm also an astronomy major, so I have a rather deep background 
in math and physics as well.

I've worked for Amazon, a few startups, and took a fellowship
at Major League Hacking.`;

const About = () => {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    amount: 0.85,
    once: true,
  });

  return (
    <div
      ref={ref}
      className="h-screen flex justify-center snap-start items-center"
    >
      <div className="w-[200px] lg:w-[300px] h-fit absolute">
        <motion.div
          initial={{ opacity: 0, y: "var(--y-from)", x: "var(--x)" }}
          {...(inView && {
            initial: { opacity: 0, y: "var(--y-from)", x: "var(--x)" },
            animate: { opacity: 1, y: "var(--y-to)" },
          })}
          transition={{ duration: 2, type: "spring" }}
          className="
            [--x:-85px] 
            sm:[--x:-205px] 
            md:[--x:-265px] 
            [--y-from:-240px]
            [--y-to:-140px]
            sm:[--y-from:-220px] 
            sm:[--y-to:-120px]
          "
        >
          <Image
            style={{ clipPath: "url(#computer-image)" }}
            width={0.8}
            height={1}
            layout="responsive"
            src={ComputerPic}
            alt="picture of me by Rae Xin"
            priority
          />
          <svg className="absolute left-0 right-0 w-full h-full">
            <defs>
              <clipPath id="computer-image">
                <motion.rect
                  {...(inView && {
                    initial: { y: "0", opacity: 0 },
                    animate: { y: "5%", opacity: 1 },
                  })}
                  transition={{ duration: 3, type: "spring" }}
                  x="15%"
                  width="70%"
                  height="95%"
                  rx={10}
                />
              </clipPath>
            </defs>
          </svg>
        </motion.div>
      </div>
      <div className="w-[200px] lg:w-[300px] h-fit absolute">
        <motion.div
          transition={{ duration: 2, type: "spring", delay: 0.5 }}
          initial={{ opacity: 0, y: "var(--y-from)", x: "var(--x)" }}
          {...(inView && {
            initial: { opacity: 0, y: "var(--y-from)", x: "var(--x)" },
            animate: { opacity: 1, y: "var(--y-to)" },
          })}
          className="
            [--x:85px] 
            sm:[--x:205px]
            md:[--x:265px] 
            [--y-from:40px]
            [--y-to:140px]
            md:[--y-from:-80px] 
            md:[--y-to:20px]
          "
        >
          <Image
            style={{ clipPath: "url(#space-image)" }}
            width={0.7913232}
            height={1}
            layout="responsive"
            src={SpacePic}
            alt="picture of me by Rae Xin"
            priority
          />
          <svg className="absolute left-0 right-0 w-full h-full">
            <defs>
              <clipPath id="space-image">
                <motion.rect
                  {...(inView && {
                    initial: { y: "0", opacity: 0 },
                    animate: { y: "5%", opacity: 1 },
                  })}
                  transition={{ duration: 3, type: "spring", delay: 0.5 }}
                  x="15%"
                  width="70%"
                  height="95%"
                  rx={10}
                />
              </clipPath>
            </defs>
          </svg>
        </motion.div>
      </div>
      <div className="w-tight h-fit flex justify-center">
        <div className="mt-2 w-fit flex flex-col rounded border border-[rgba(0,0,0,.1)] bg-white bg-opacity-30 shadow backdrop-blur-xl">
          <span className="border-b border-[rgba(0,0,0,.1)] font-medium p-1 sm:p-2 pl-2 text-left font-code text-[8px] sm:text-xs">
            README.md
          </span>
          <SyntaxHighlighter
            language="json"
            showLineNumbers={true}
            className="h-full p-1 sm:p-2 text-[8px] sm:text-xs w-fit"
            style={hyperlineLight as { [key: string]: React.CSSProperties }}
          >
            {snippet}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default About;
