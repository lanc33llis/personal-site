import { NextPage } from "next";
import Head from "next/head";

import Hero from "@/components/Home/Hero";
import Card from "@/components/Home/Card";
import Footer from "@/components/Footer";
import About from "@/components/Home/About";

import { LazyMotion, domAnimation } from "framer-motion";
import AnimatedBackground from "@/components/Home/animated-background";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type HomeCard = [
  title: string,
  date: string,
  src: string,
  href: string,
  description: string,
];
const HomeCards: HomeCard[] = [
  ["Platform_Zinc", "Fall 2023 - Current", "/platform_zinc.png", "", ""],
  ["Amazon Alexa Device Sorting", "Summer 2023", "/amazon_2.mp4", "", "hi"],
  ["UT Course Network Map", "Spring 2022", "/ut-course-map.png", "", "hi"],
];

const Home: NextPage = () => {
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    const width = document.querySelector(".line-container")?.clientWidth
      ? document.querySelector(".line-container")!.clientWidth - 64
      : 0;
    setLineWidth(Math.trunc(width / 8));

    window.addEventListener("resize", () => {
      const width = document.querySelector(".line-container")?.clientWidth
        ? document.querySelector(".line-container")!.clientWidth - 64
        : 0;
      setLineWidth(Math.trunc(width / 8));
    });
  }, []);

  console.log(lineWidth);

  return (
    <LazyMotion features={domAnimation}>
      <Head>
        <title>Lance Ellis - Home</title>
      </Head>
      <AnimatedBackground target="gradient-canvas" gradientOpts={{ t: -4000 }}>
        <Hero />
      </AnimatedBackground>
      <AnimatedBackground target="gradient-canvas-2" gradientOpts={{ t: 0 }}>
        <About />
      </AnimatedBackground>
      <AnimatedBackground target="gradient-canvas-3" gradientOpts={{ t: 4000 }}>
        <div className="py-24 flex w-full flex-col items-center justify-center px-2">
          <div className="max-w-5xl mx-auto w-full flex flex-col grow items-center md:items-end gap-16">
            {HomeCards.map(([name, date, file, className, description]) => (
              <div
                key={name}
                className="border backdrop-blur-xl bg-foreground/10 flex border-foreground/10 flex-col w-full justify-between"
              >
                <div className="border-b border-foreground/10 p-1 sm:p-2 pl-2 text-left flex justify-between font-code text-[.5rem] sm:text-xs gap-1">
                  <span>{name}</span>
                  <span className="text-foreground">{date}</span>
                </div>
                <div className="flex md:flex-row flex-col items-center md:items-start">
                  {(file.endsWith("mp4") && (
                    <video
                      src={file}
                      width={250}
                      muted
                      autoPlay
                      className={cn("w-[250px]", className)}
                    />
                  )) || (
                    <Image
                      src={file}
                      width={1024}
                      height={1}
                      alt={date}
                      className={cn("w-full md:w-[450px]", className)}
                    />
                  )}
                  <div className="line-container  w-full h-fit flex flex-col overflow-hidden">
                    <div className="w-full flex h-full p-1 sm:p-2 text-[8px] sm:text-xs md:text-sm">
                      <div className="h-full flex flex-col pr-4">
                        {Array.from(
                          {
                            length:
                              Math.floor(description.length / lineWidth) ===
                              Infinity
                                ? 0
                                : Math.floor(description.length / lineWidth),
                          },
                          (_, i) => i + 1,
                        ).map((line) => (
                          <div className="flex">
                            <p key={line} className=" dark:text-foreground w-8">
                              {line}
                            </p>
                            <code className="dark:text-foreground">
                              {description.slice(
                                line * lineWidth,
                                (line + 1) * lineWidth,
                              )}
                            </code>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </AnimatedBackground>
    </LazyMotion>
  );
};

export default Home;
