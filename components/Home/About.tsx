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
    lastEdit: "10/09/25 2:14PM PST",
    content: `Hey! I am a self-taught programmer specializing in web development
and design. I'm highly proficient with TypeScript, React, and
Next.js. I enjoy building large scaling applications; I have a
strong background in DevOps and CI/CD pipelines. Recently, I've
been focusing on building web applications and libraries for LLMs.

I've worked for Amazon, where I developed internal tools and later,
user-facing features for the Alexa app. My experience also includes
contracting and freelancing for small startups primarily for mobile
and web development. I've also worked previously at Atlassian. In
addition, I took a fellowship at Major League Hacking to learn
about production engineering.

I'm founded Linkage, a dev tooling company for workflow experiences.`,
  },
  "RESUME.md": {
    lastEdit: "10/09/25 2:20PM PST",
    content: `Atlassian
Software Development Engineer Intern
May 2025 – Aug 2025
• Built an MCP service exposing performance metrics to PMs, data
  scientists, and non-engineers—no SQL required.
• Cut data turnaround from 2–3 days to under a minute, removing
  ad-hoc engineering requests.
• Implemented with Next.js, TypeScript, AWS, DynamoDB, Postgres.

May 2024 – Aug 2024
• Built a microservice aggregating risk findings and mitigations
  for executive-level reporting.
• Automated data gathering, reducing prep time from hours to
  minutes.
• Designed with AWS API Gateway, Lambda, DynamoDB, ALB, EventBridge,
  and CloudFormation; implemented in Python, Boto3, Pytest, Docker.

Amazon
Software Development Engineer Intern
May 2023 – Aug 2023
• Designed and shipped list sorting for Alexa app, improving
  usability for 50M+ users.
• Reduced friction with scroll persistence, UI updates, DB
  migrations.
• Built with React Native, TypeScript, Redux, Apollo, Jest.

May 2022 – Aug 2022
• Built a linter validating Alexa page renderings, reducing dev
  errors by ~30%.
• Implemented in Java using JSON Schemas and tree traversal—10×
  faster than standard validators.
• Created interactive UI in TypeScript, React, TailwindCSS,
  Recoil for 1K+ Alexa engineers.`,
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
      className="relative grow flex justify-center snap-center items-center overflow-hidden "
    >
      <div className="relative h-fit flex">
        <div className="text-xs border-r-0 flex flex-col flex-1 border bg-background/25 border-background/25 dark:border-foreground/10 dark:bg-foreground/10 shadow backdrop-blur-xl">
          <span className="flex gap-1 items-center p-2">
            <ChevronDownIcon />
            <span>lancee</span>
          </span>
          {Object.keys(files).map((file) => (
            <button
              key={file}
              className={cn(
                "flex font-mono gap-1 px-2 hover:bg-foreground/10 py-0.5",
                file === selectedFile && "bg-foreground/10 text-foreground/100",
              )}
              onClick={() => setSelectedFile(file as keyof typeof files)}
            >
              <MarkdownIcon />
              <span>{file}</span>
            </button>
          ))}
        </div>
        <div className="w-[622px] h-max flex flex-col border border-foreground/10 backdrop-blur-xl bg-foreground/10">
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
