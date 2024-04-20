import { m, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/legacy/image";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";

import hyperlineLight from "../../styles/hyperline-light";

const snippet = `I'm glad you're here. I am a self-taught programmer specializing 
in web development and design, with a thorough background in web 
technologies including Next.js, Flask, Spring, and much more. My 
focus is on full-stack development, but my skills are broad, 
encompassing product management, DevOps, system administration, 
UI/UX  design, and mobile development.

I have worked for Amazon, where I developed internal tools and later,
user-facing features for the Alexa app. My experience also includes 
contracting and freelancing, with a primary focus on web development. 
In addition, I have taken a fellowship at Major League Hacking to 
learn about production engineering.

Currently, I am interning at Atlassian as a software developer.`;

const About = () => {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    amount: 0.85,
    once: true,
  });

  const codeRef = useRef<HTMLPreElement>(null);
  const [lines, setLines] = useState(0);

  console.log(lines);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect && codeRef.current) {
          const el = entry.contentRect;

          const divHeight = el.height;
          setLines(
            divHeight /
              parseInt(window.getComputedStyle(codeRef.current).lineHeight)
          );
        }
      }
    });

    if (codeRef.current) {
      resizeObserver.observe(codeRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="h-screen flex justify-center snap-center items-center overflow-hidden"
    >
      <div className="w-[200px] lg:w-[300px] h-fit absolute">
        <m.div
          initial={{ opacity: 0, y: "var(--y-from)", x: "var(--x)" }}
          {...(inView && {
            initial: { opacity: 0, y: "var(--y-from)", x: "var(--x)" },
            animate: { opacity: 1, y: "var(--y-to)" },
          })}
          transition={{ duration: 2, type: "spring" }}
          className="
            [--x:-85px] 
            sm:[--x:-205px] 
            md:[--x:-305px] 
            [--y-from:-240px]
            [--y-to:-140px]
            sm:[--y-from:-220px] 
            sm:[--y-to:-70px]
          "
        >
          <Image
            style={{ clipPath: "url(#computer-image)" }}
            width={0.8}
            height={1}
            layout="responsive"
            src={"/andras-vas-Bd7gNnWJBkU-unsplash.jpg"}
            alt="picture of me by Rae Xin"
            quality={10}
            priority
          />
          <svg className="absolute left-0 right-0 w-full h-full">
            <defs>
              <clipPath id="computer-image">
                <m.rect
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
        </m.div>
      </div>
      <div className="w-[200px] lg:w-[300px] h-fit absolute">
        <m.div
          transition={{ duration: 2, type: "spring", delay: 0.5 }}
          initial={{ opacity: 0, y: "var(--y-from)", x: "var(--x)" }}
          {...(inView && {
            initial: { opacity: 0, y: "var(--y-from)", x: "var(--x)" },
            animate: { opacity: 1, y: "var(--y-to)" },
          })}
          className="
            [--x:85px] 
            sm:[--x:205px]
            md:[--x:305px] 
            [--y-from:40px]
            [--y-to:140px]
            md:[--y-from:-80px] 
            md:[--y-to:60px]
          "
        >
          <Image
            style={{ clipPath: "url(#space-image)" }}
            width={0.7913232}
            height={1}
            layout="responsive"
            src={"/joel-filipe-QwoNAhbmLLo-unsplash.jpg"}
            alt="picture of me by Rae Xin"
            quality={10}
            priority
          />
          <svg className="absolute left-0 right-0 w-full h-full">
            <defs>
              <clipPath id="space-image">
                <m.rect
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
        </m.div>
      </div>
      <div className="w-tight h-max flex justify-center">
        <div className="mt-2 w-fit flex flex-col rounded border border-[rgba(0,0,0,.15)] bg-white bg-opacity-60 shadow backdrop-blur-xl">
          <div className="border-b flex justify-between border-[rgba(0,0,0,.15)] font-medium p-1 sm:p-2 pl-2 text-left font-code text-[8px] sm:text-xs">
            <span>README.md</span>
            <span className="text-zinc-500">2/1/24 9:57PM CST</span>
          </div>
          <pre className="flex h-full p-1 sm:p-2 text-[8px] sm:text-sm w-fit">
            <div className="h-full flex flex-col pr-4">
              {Array.from({ length: lines }, (_, i) => i + 1).map((line) => (
                <span key={line} className="text-end text-gray-700">
                  {line}
                </span>
              ))}
            </div>
            <code ref={codeRef}>{snippet}</code>
          </pre>
          {/* <SyntaxHighlighter
            language="plaintext"
            showLineNumbers={true}
            lineNumberStyle={{ minWidth: "2.25em" }}
            className="h-full p-1 sm:p-2 text-[8px] sm:text-sm w-fit"
            style={hyperlineLight as { [key: string]: React.CSSProperties }}
          >
            {snippet}
          </SyntaxHighlighter> */}
        </div>
      </div>
    </div>
  );
};

export default About;
