import { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import { motion } from "framer-motion";
import Link from "next/link";

import Footer from "../components/Footer";

const About: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Lance Ellis - About</title>
      </Head>
      <Header forceOpen />
      <motion.div
        className="absolute top-0 flex flex-col items-center justify-center w-full min-h-screen px-8 pt-16 pb-48 md:pb-24 lg:pb-0 sm:px-16 lg:px-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.7 }}
      >
        <div className="flex flex-col w-full gap-4 md:gap-8 lg:gap-16">
          <h2 className="text-2xl font-medium md:text-3xl lg:text-7xl">
            Hi! I&apos;m Lance, a web developer and designer <br /> in Austin,
            TX.
          </h2>
          <p className="text-base md:text-xl lg:text-2xl">
            I am currently a sophomore at the University of Texas at Austin,
            where I am working towards a degree in astronomy. <br />
            <br />I enjoy using my unique combination of technical skills and
            scientific knowledge to solve complex problems. I am a self-taught
            programmer and have developed a wide range of software and web
            applications. <br />
            <br /> In my free time I play video games (League and TFT), create
            digital art, and travel to new places. <br />
            <br />
            <Link href="/resume.pdf">
              <a className="underline">Resume</a>
            </Link>
          </p>
          <Footer marginY={false} />
        </div>
      </motion.div>
    </div>
  );
};

export default About;
