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
              alt="Y'all App"
              src="/yall.png"
              width={240}
              height={526}
              heading="Mobile Application"
              title="Y'all"
              description="Social organization app for day-to-day activities. CTO and raised 50k in pre-seed funding."
              date="Spring 2024, Expected Spring 2025"
              technologies="React Native, Next.js, tRPC, Drizzle ORM"
            />
            <Card
              alt="LHR PPO"
              src="/ppo.png"
              width={1750}
              height={1161}
              heading="Reinforcement Learning Model"
              title="Solving Solar Car Race Strategy with Proximal Policy Optimization"
              description="Developed a reinforcement learning model to optimize the strategy of solar vehicles in the American Solar Challenge. The model was trained in a simulated environment using the PyChrono physics engine."
              date="Spring 2024 - Present"
              technologies="Python, Gymnasium, Tensorflow, PyChrono"
            />
            <Card
              alt="Amazon Alexa"
              src="/amazon_2.mp4"
              width={240}
              video
              heading="Mobile Development"
              title="Amazon Alexa Device Sorting"
              description="Engineered the device sorting feature for the Amazon Alexa app. Business-critical requirement for Alexa's Q3 2023 app refresh. Sees millions of interactions a month."
              date="Winter 2023"
              technologies="REACT NAIVE, GRAPHQL, TYPESCRIPT"
            />
            <Card
              alt="Slashbase"
              src="/slashbase.png"
              width={1920}
              height={1080}
              heading="Web Application"
              title="Slashbase"
              date="Winter 2023 - Present"
              description="No-code AI platform for software engineers. Framework for building, deploying, and scaling AI experiences."
              technologies="Next.js, AWS Bedrock, LlamaIndex, xyflow"
              // link="https://www.slashbase.co/"
              // reverse
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
