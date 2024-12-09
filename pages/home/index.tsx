import { NextPage } from "next";
import Head from "next/head";

import Hero from "@/components/Home/Hero";
import Card from "@/components/Home/Card";
import Footer from "@/components/Footer";
import About from "@/components/Home/About";

import { LazyMotion, domAnimation } from "framer-motion";
import AnimatedBackground from "@/components/Home/animated-background";

type HomeCard = [title: string, description: string, src: string, href: string];
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
    <LazyMotion features={domAnimation}>
      <AnimatedBackground>
        <Head>
          <title>Lance Ellis - Home</title>
        </Head>
        <Hero />
        <About />
        <div className="mb-24 px-4 sm:px-16 lg:px-24 flex flex-col gap-8 items-center">
          <div className="max-w-normal w-full">
            <h2 className="text-4xl font-semibold sm:text-6xl lg:text-6xl xl:text-7xl lg:mb-4 text-left text-foreground/100">
              Projects
            </h2>
          </div>
          <div className="grow flex flex-col items-center gap-48">
            <Card
              alt="Amazon Alexa"
              src="/amazon_2.mp4"
              width={240}
              video
              heading="Feature Development"
              title="Amazon Alexa Device Sorting"
              description="Engineered the device sorting feature for the Amazon Alexa app. Business-critical requirement for Alexa's Q3 2023 app refresh. Sees millions of interactions a month."
              date="Winter 2023"
              technologies="REACT NAIVE, GRAPHQL, TYPESCRIPT"
            />
            <Card
              alt="Slashbase"
              src="/note-editor-image-light.png"
              width={1920}
              height={1080}
              heading="Web Application"
              title="Slashbase"
              date="Winter 2023 - Present"
              description="Futuristic note editor with a focus on AI and collaboration. Built from the ground up to be sleek, fast, and flexible."
              technologies="Next.js, AWS Bedrock, Tiptap, Typescript"
              link="https://www.slashbase.co/"
              reverse
            />
            <Card
              alt="UT Course Map"
              src="/coursemap_1.mp4"
              width={1560}
              video
              heading="Interactive Web App"
              title="UT Course Map"
              date="Spring 2022"
              description="Visualize the courses offered at UT Austin as a network graph. Data was scraped from UT's website with a Selenium bot."
              technologies="Next.js, Python, Selenium, D3.js"
              link="https://ut-course-map-viz.vercel.app/"
            />
          </div>
        </div>
        <Footer />
      </AnimatedBackground>
    </LazyMotion>
  );
};

export default Home;
