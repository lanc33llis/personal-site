import { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import { motion } from "framer-motion";
import Link from "next/link";

import Footer from "../components/Footer";

interface AboutDetailLine {
  first: string;
  middle: string;
  right: string;
}

const workExperiences: AboutDetailLine[] = [
  {
    first: "Amazon",
    middle: "Software Development Engineer Intern",
    right: "Summer 2022",
  },
  {
    first: "Major League Hacking",
    middle: "Production Engineering Fellow",
    right: "Summer 2021",
  },
  {
    first: "Trinity University",
    middle: "Computer Science Research Intern",
    right: "2020 - 2021",
  },
];

const skills: AboutDetailLine[] = [
  {
    first: "Web Development",
    middle: "React, Next.js, TailwindCSS, Django, Spring, Express",
    right: "2 years",
  },
  {
    first: "DevOps",
    middle: "Docker, AWS, Bash Scripting, GitHub Actions",
    right: "2 years",
  },
  {
    first: "Languages",
    middle: "Python, Java, C++, JavaScript/TypeScript",
    right: "",
  },
];
const About: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Lance Ellis - About</title>
      </Head>
      <Header forceOpen />
      <motion.div
        className="absolute top-0 flex flex-col items-center justify-center px-8 pt-16 pb-28 md:pb-12 lg:pb-0 sm:px-16 lg:px-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.7 }}
      >
        <div className="flex flex-col w-full ">
          <div className="flex flex-col justify-center w-full min-h-screen gap-4 md:gap-8 lg:gap-16">
            <h2 className="text-2xl font-medium md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
              Hi! I&apos;m Lance, a web developer and <br /> designer in Austin,
              TX.
            </h2>
            <p className="text-base md:text-xl lg:text-xl xl:text-2xl">
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
          </div>

          <div>
            <div className="flex flex-col w-full mb-16">
              <h2 className="py-4 text-4xl font-semibold border-black border-b-[1.5px]">
                Experiences
              </h2>
              {workExperiences.map((we) => (
                <div
                  className="flex py-4 border-black border-b-[1.5px]"
                  key={we.first}
                >
                  <div className="w-48 mr-32">
                    <h3 className="text-lg">{we.first}</h3>
                  </div>
                  <div className="mr-32 w-[500px]">
                    <h3 className="text-lg">{we.middle}</h3>
                  </div>
                  <div className="w-32 mr-32">
                    <h3 className="text-lg">{we.right}</h3>
                  </div>
                </div>
              ))}
              <h2 className="py-4 mt-16 text-4xl font-semibold border-black border-b-[1.5px]">
                Skills
              </h2>
              {skills.map((s) => (
                <div
                  className="flex py-4 border-black border-b-[1.5px]"
                  key={s.first}
                >
                  <div className="w-48 mr-32">
                    <h3 className="text-lg">{s.first}</h3>
                  </div>
                  <div className="mr-32 w-[500px]">
                    <h3 className="text-lg">{s.middle}</h3>
                  </div>
                  <div className="w-32 mr-32">
                    <h3 className="text-lg">{s.right}</h3>
                  </div>
                </div>
              ))}
            </div>
            <Footer marginY={false} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
