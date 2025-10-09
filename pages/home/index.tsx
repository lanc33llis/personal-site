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
        <div className="flex flex-col min-h-screen">
          <About />
          <Footer />
        </div>
      </AnimatedBackground>
    </LazyMotion>
  );
};

export default Home;
