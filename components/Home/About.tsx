import { m, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/legacy/image";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";

import hyperlineLight from "@/styles/hyperline-light";
import { ArrowDownIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import MarkdownIcon from "./markdown-icon";
import { cn } from "@/lib/utils";

const files = {
  "README.md": {
    lastEdit: "05/12/25 12:22AM CST",
    content: `Hey! I am a self-taught programmer specializing in web development
and design. I'm highly proficient with TypeScript, React, and
Next.js. I enjoy building large scaling applications; I have a
strong background in DevOps and CI/CD pipelines. Recently, I've
been focusing on building web applications and libraries for LLMs.

I've worked for Amazon, where I developed internal tools and later,
user-facing features for the Alexa app. My experience also includes
contracting and freelancing for small startups primarily for mobile
and web development. I've also worked previously at Atlassian on
their governance security team. In addition, I took a fellowship at
Major League Hacking to learn about production engineering.

I'll be returning to Atlassian as a software engineer intern.`,
  },
  "RESUME.md": {
    lastEdit: "05/12/25 12:22AM CST",
    content: `# Lance Ellis`,
  },
} as const satisfies Record<
  string,
  {
    lastEdit: string;
    content: string;
  }
>;

const About = () => {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    amount: 0.85,
    once: true,
  });

  const codeRef = useRef<HTMLPreElement>(null);

  const [selectedFile, setSelectedFile] =
    useState<keyof typeof files>("README.md");

  return (
    <div
      ref={ref}
      className="relative h-screen flex justify-center snap-center items-center overflow-hidden "
    >
      <div className="relative max-w-[622px] h-max flex flex-col gap-1">
        {/* <div className="text-xs absolute z-50 -translate-x-[150%] flex flex-col h-full rounded border bg-background/25 border-background/25 dark:border-foreground/10 dark:bg-foreground/10 shadow backdrop-blur-xl">
          <span className="flex gap-1 items-center p-2">
            <ChevronDownIcon />
            <span>lancee</span>
          </span>
          {Object.keys(files).map((file) => (
            <button
              key={file}
              className={cn(
                "flex gap-1 px-2 hover:bg-foreground/10 py-0.5",
                file === selectedFile && "bg-foreground/10 text-foreground/100"
              )}
              onClick={() => setSelectedFile(file as keyof typeof files)}
            >
              <MarkdownIcon />
              <span>{file}</span>
            </button>
          ))}
        </div> */}
        <div className="w-fit flex my-4 flex-col border border-foreground/10 backdrop-blur-xl bg-foreground/10">
          <div className="border-b flex justify-between border-foreground/10 p-1 sm:p-2 pl-2 text-left font-code text-[.5rem] sm:text-xs">
            <span>{selectedFile}</span>
            <span className="dark:text-foreground">
              {files[selectedFile].lastEdit}
            </span>
          </div>
          <pre className="flex h-full p-1 sm:p-2 text-[8px] sm:text-xs md:text-sm w-fit">
            <div className="h-full flex flex-col pr-4">
              {Array.from(
                { length: files[selectedFile].content.split("\n").length },
                (_, i) => i + 1,
              ).map((line) => (
                <span key={line} className="text-end dark:text-foreground">
                  {line}
                </span>
              ))}
            </div>
            <code className="dark:text-foreground" ref={codeRef}>
              {files[selectedFile].content}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default About;
