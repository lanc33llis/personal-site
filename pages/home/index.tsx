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

type HomeCard = [title: string, description: string, src: string, href: string];
const HomeCards: HomeCard[] = [
  ["Platform_Zinc", "Fall 2023 - Current", "/platform_zinc.png", ""],
  ["Y'all", "Fall 2023 - Spring 2025", "/yall.png", "w-[250px] bg-[#023256]"],
  ["Amazon Alexa Device Sorting", "Summer 2023", "/amazon_2.mp4", ""],
  ["UT Course Network Map", "Spring 2022", "/ut-course-map.png", ""],
];

const Home: NextPage = () => {
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
          <div className="max-w-7xl flex flex-col grow items-center lg:items-end gap-16">
            {HomeCards.map(([name, date, file, className]) => (
              <div
                key={name}
                className="flex flex-col lg:flex-row gap-2 w-full items-center justify-center"
              >
                {(file.endsWith("mp4") && (
                  <video
                    src={file}
                    width={250}
                    muted
                    autoPlay
                    className={className}
                  />
                )) || (
                  <Image
                    src={file}
                    width={520}
                    height={1}
                    alt={date}
                    className={cn(className)}
                  />
                )}
                <div className="max-w-[500px] w-full h-fit flex flex-col border border-foreground/10 backdrop-blur-xl bg-foreground/10">
                  <div className="border-b flex border-foreground/10 p-1 sm:p-2 pl-2 text-left justify-between font-code text-[.5rem] sm:text-xs gap-1">
                    <span>{name}</span>
                    <span className="text-foreground">{date}</span>
                  </div>
                  <pre className="flex h-full p-1 sm:p-2 text-[8px] sm:text-xs md:text-sm w-fit">
                    <div className="h-full flex  pr-4">
                      {Array.from(
                        { length: date.split("\n").length },
                        (_, i) => i + 1,
                      ).map((line) => (
                        <span
                          key={line}
                          className="text-end dark:text-foreground"
                        >
                          {line}
                        </span>
                      ))}
                    </div>
                    <code className="dark:text-foreground">{date}</code>
                  </pre>
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
