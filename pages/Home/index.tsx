import { NextPage } from "next";

import Hero from "./Hero";
import Header from "../components/Header";
import Card from "./Card";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

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
      <Header />
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.7 }}
      >
        <Hero />
        <div className="border-y border-black py-8 mb-8">
          <Marquee gradient={false}>
            <span className="text-2xl px-2">
              WE CHOOSE TO GO TO THE MOON IN THIS DECADE AND DO THE OTHER
              THINGS, NOT BECAUSE THEY ARE EASY, BUT BECAUSE THEY ARE HARD.
            </span>
          </Marquee>
        </div>
        <div className="px-8 sm:px-16 lg:px-24">
          <h2 className="text-4xl border-b-[1.5px] border-black py-6">
            Projects
          </h2>
        </div>
        <div className="flex flex-wrap px-8 sm:px-16 lg:px-24 gap-4 flex-col lg:flex-row items-center lg:items-start my-8">
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
