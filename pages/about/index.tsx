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

type AboutSection = { title: string; lines: AboutDetailLine[] };

const workExperiences: AboutSection = {
  title: "Experiences",
  lines: [
    {
      first: "Amazon",
      middle: "Software Development Engineer Intern",
      right: "Summer 2023",
    },
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
  ],
};

const skills: AboutSection = {
  title: "Skills",
  lines: [
    {
      first: "Web Development",
      middle: "React, Next.js, TailwindCSS, Django, Spring, Express",
      right: "3 years",
    },
    {
      first: "DevOps",
      middle: "Docker, AWS, Bash Scripting, GitHub Actions",
      right: "3 years",
    },
    {
      first: "Languages",
      middle: "Python, Java, C++, JavaScript/TypeScript",
      right: "2 years",
    },
  ],
};

const sections: AboutSection[] = [workExperiences, skills];

const About: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Lance Ellis - About</title>
      </Head>
      <Header forceOpen />
      <motion.div
        className="absolute top-0 flex flex-col items-center justify-center px-8 sm:px-16 lg:px-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.7 }}
      >
        <div className="flex flex-col w-full ">
          <div className="flex flex-col justify-center w-full min-h-screen gap-4 pt-16 md:gap-8 lg:gap-16 pb-28 md:pb-12 lg:pb-0">
            <h2 className="text-2xl font-medium md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
              Hi! I&apos;m Lance, a web developer and <br /> designer in Austin,
              TX.
            </h2>
            <p className="text-base md:text-xl lg:text-xl xl:text-2xl">
              I am currently a junior at the University of Texas at Austin,
              where I am working towards a degree in sociology. <br />
              <br />I enjoy using my unique combination of technical skills and
              unique background to solve complex problems. I am a self-taught
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
            <div className="flex flex-col w-full ">
              {sections.map((s) => (
                <div key={s.title} className="mb-8 lg:mb-16">
                  <h2 className="py-6 font-medium  text-2xl border-black md:text-3xl: lg:text-4xl border-b-[1.5px]">
                    {s.title}
                  </h2>
                  {s.lines.map((l) => (
                    <div
                      className="flex py-4 border-black border-b-[1.5px]"
                      key={l.first}
                    >
                      <div className="w-[6.5rem] md:w-48">
                        <h3 className="text-sm md:text-base lg:text-lg">
                          {l.first}
                        </h3>
                      </div>
                      <div className="flex flex-col gap-4 md:flex-row">
                        <div className="w-[200px] md:w-[300px] lg:w-[400px]">
                          <h3 className="text-sm md:text-base lg:text-lg">
                            {l.middle}
                          </h3>
                        </div>
                        <div className="w-32 ">
                          <h3 className="text-sm md:text-base lg:text-lg">
                            {l.right}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-4 mb-12 lg:mb-16">
              <Footer marginY={false} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
