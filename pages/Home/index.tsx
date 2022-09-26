import { NextPage } from "next";

import Hero from "./Hero";
import Header from "../components/Header";
import Card from "./Card";

type HomeCard = [
  title: string,
  description: string,
  src: string,
  href: string,
  image: boolean
];
// videos do bad stufff
const HomeCards: HomeCard[] = [
  [
    "Shipper",
    "Desktop application built with React and Rust that does 1-step deployments to any host using SSH",
    "/shipper.png",
    "/project/shipper",
    true,
  ],
  [
    "KISS",
    "Experimental Image Manipulation using the canvas API",
    "/kiss_c.mp4",
    "/project/kiss",
    false,
  ],
  [
    "UT Course Map",
    "A web app that allows you to view the courses offered at UT Austin as a network graph. Built with React, Next.js, and D3.js. Data scraped from UT with a Selenium bot",
    "/coursemap_c.mp4",
    "/project/coursemap",
    false,
  ],
  [
    "Allday",
    "Sketch of a startup relating to the mobile eCommerce industry. Built with React, Next.js, and Tailwind CSS",
    "/allday.png",
    "/project/allday",
    true,
  ],
];

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <div className="flex flex-wrap p-4 gap-4 flex-col lg:flex-row items-center lg:items-start">
        {HomeCards.map((card, index) => (
          <Card
            key={index}
            title={card[0]}
            description={card[1]}
            src={card[2]}
            href={card[3]}
            image={card[4]}
            inViewAnimationDelay={index * 0.5}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
