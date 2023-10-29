import { NextPage } from "next";

import Hero from "./Hero";
import Header from "../components/Header";
import Card from "./Card2";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Head from "next/head";
import Image from "next/image";
import About from "./About";

// import { motion, useInView } from "framer-motion";

type HomeCard = [title: string, description: string, src: string, href: string];
// videos do bad stufff
const HomeCards: HomeCard[] = [
  [
    "HyperLine",
    "Web application built with React and AWS SDK lets you build type-safe CI/CD pipelines",
    "/hyperline.png",
    "/projects#hyperline",
  ],
  [
    "KISS",
    "Experimental Image Manipulation using the canvas API",
    "/kiss.png",
    "/projects#kiss",
  ],
  [
    "UT Course Map",
    "A web app that allows you to view the courses offered at UT Austin as a network graph. Built with React, Next.js, and D3.js. Data scraped from UT with a Selenium bot",
    "/ut-course-map.png",
    "/projects#coursemap",
  ],
  [
    "Allday",
    "Sketch of a startup relating to the mobile eCommerce industry. Built with React, Next.js, and Tailwind CSS",
    "/allday.png",
    "/projects#allday",
  ],
];

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Lance Ellis - Home</title>
      </Head>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.7 }}
      >
        <Hero />
        {/* <div className="py-8 mb-8 border-black border-y">
          <Marquee gradient={false}>
            <span className="px-2 text-2xl">
              WE CHOOSE TO GO TO THE MOON IN THIS DECADE AND DO THE OTHER
              THINGS, NOT BECAUSE THEY ARE EASY, BUT BECAUSE THEY ARE HARD.
            </span>
          </Marquee>
        </div> */}
        <About />
        <div className="mb-24 px-8 sm:px-16 lg:px-24 flex flex-col gap-8">
          <div className="w-fit">
            <h2 className="text-4xl font-medium text-center sm:text-6xl lg:text-6xl xl:text-7xl lg:mb-4 lg:text-left">
              Projects
            </h2>
          </div>
          <div className="grow flex flex-col items-center gap-48">
            <Card
              alt="Amazon Alexa"
              src="/amazon.MP4"
              width={240}
              video
              heading="Mobile Feature"
              title="Alexa Sorting Feature"
              description="Device list sorting alphabetically and by date added."
              technologies="REACT NAIVE, GRAPHQL, TYPESCRIPT"
            />
            <Card
              alt="HyperLine"
              src="/hyperline.png"
              width={1920}
              height={1080}
              heading="Web App"
              title="HyperLine"
              description="Build type-safe, serverless CI/CD pipelines with TypeScript."
              technologies="NEXT.JS, AWS SDK, TYPESCRIPT"
              reverse
            />
            <Card
              alt="UT Course Map"
              src="/coursemap.mp4"
              width={1560}
              video
              heading="Interactive Web App"
              title="UT Course Map"
              description="Visualize the courses offered at UT Austin as a network graph. Data was scraped from UT's website with a Selenium bot."
              technologies="Next.js, Python, Selenium, D3.js"
            />
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Home;
