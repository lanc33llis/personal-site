import { NextPage } from "next";

import Hero from "./Hero";
import Header from "../components/Header";
import Card from "./Card";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Head from "next/head";

type HomeCard = [title: string, description: string, src: string, href: string];
// videos do bad stufff
const HomeCards: HomeCard[] = [
  [
    "Shipper",
    "Desktop application built with React and Rust that does 1-step deployments to any host using SSH",
    "/shipper.png",
    "/projects#shipper",
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
      <Header />
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.7 }}
      >
        <Hero />
        <div className="py-8 mb-8 border-black border-y">
          <Marquee gradient={false}>
            <span className="px-2 text-2xl">
              WE CHOOSE TO GO TO THE MOON IN THIS DECADE AND DO THE OTHER
              THINGS, NOT BECAUSE THEY ARE EASY, BUT BECAUSE THEY ARE HARD.
            </span>
          </Marquee>
        </div>
        <div className="px-8 sm:px-16 lg:px-24">
          <h2 className="py-6 text-4xl border-black border-b-[1.5px]">
            Projects
          </h2>
        </div>
        <div className="flex flex-col flex-wrap items-center gap-4 px-8 my-8 sm:px-16 lg:px-24 lg:flex-row lg:items-start">
          {HomeCards.map((card, index) => (
            <Card
              key={index}
              title={card[0]}
              description={card[1]}
              src={card[2]}
              href={card[3]}
              inViewAnimationDelay={index * 0.25}
            />
          ))}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Home;
