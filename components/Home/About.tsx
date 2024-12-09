import { m, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/legacy/image";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";

import hyperlineLight from "@/styles/hyperline-light";
import { ArrowDownIcon, ChevronDownIcon } from "@radix-ui/react-icons";

const snippet = `Hey! I am a self-taught programmer specializing in 
web development and design. I'm deeply proficient with TypeScript,
React, and Next.js. I enjoy building large scaling applications;
I have a heavy background on DevOps and CI/CD pipelines. Recently,
I've been building web applications and libraries for LLMs. 

I've worked for Amazon, where I developed internal tools and later,
user-facing features for the Alexa app. My experience also includes 
contracting and freelancing for small startups primarily for mobile
and web development. I've also worked previously at Atlassian on 
their governance security team. In addition, I took a fellowship at
Major League Hacking to learn about production engineering.

I'll be returning to Atlassian as a software engineer intern.`;

const About = () => {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    amount: 0.85,
    once: true,
  });

  const codeRef = useRef<HTMLPreElement>(null);

  return (
    <div
      ref={ref}
      className="relative h-screen flex justify-center snap-center items-center overflow-hidden"
    >
      {/* <div className="w-[200px] lg:w-[300px] h-fit absolute">
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
      </div> */}
      <div className="relative w-fit h-max flex flex-col gap-1">
        {/* WIP File Explorer for different 'files' */}
        {/* <div className="text-xs absolute z-50 -translate-x-[150%] flex flex-col h-full p-2 rounded border bg-background/25 border-background/25 dark:border-foreground/10 dark:bg-foreground/10 shadow backdrop-blur-xl">
          <span className="flex gap-1 items-center pb-2">
            <ChevronDownIcon />
            <span>lancee</span>
          </span>
          <button>
            <span>README.md</span>
          </button>
        </div> */}
        <div className="mt-2 w-fit flex flex-col rounded border bg-background/25 border-background/25 dark:border-foreground/10 dark:bg-foreground/10 shadow backdrop-blur-xl">
          <div className="border-b flex justify-between border-background/25 dark:border-foreground/10 p-1 sm:p-2 pl-2 text-left font-code text-[8px] sm:text-xs">
            <span>README.md</span>
            <span className="dark:text-foreground">12/8/24 11:53PM CST</span>
          </div>
          <pre className="flex h-full p-1 sm:p-2 text-[8px] sm:text-sm w-fit">
            <div className="h-full flex flex-col pr-4">
              {Array.from({ length: 14 }, (_, i) => i + 1).map((line) => (
                <span key={line} className="text-end dark:text-foreground">
                  {line}
                </span>
              ))}
            </div>
            <code className="dark:text-foreground" ref={codeRef}>
              {snippet}
            </code>
          </pre>
        </div>
        <div className="w-full flex items-center gap-1">
          <ArrowDownIcon />
          <span>Explore my work</span>
        </div>
      </div>
    </div>
  );
};

export default About;
