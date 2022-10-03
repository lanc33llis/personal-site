import { motion } from "framer-motion";
import { NextPage } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";

type SocialLink = [label: string, href: string];
const socialLinks: SocialLink[] = [
  ["GitHub", "https://github.com/lanc33llis"],
  ["LinkedIn", "https://www.linkedin.com/in/lance-ellis/"],
];

type Block = {
  title: string;
  titleRight?: string;
  description?: string;
  descriptionRight?: string;
  bullets?: string[];
  list?: boolean;
};
type Section = {
  title: string;
  blocks?: Block[];
};
type Resume = {
  sections: Section[];
};
const currentResume: Resume = {
  sections: [
    {
      title: "Education",
      blocks: [
        {
          title: "The University of Texas at Austin",
          titleRight: "May 2025",
          description: "Bachelor of Science in Astronomy",
        },
      ],
    },
    {
      title: "Experience",
      blocks: [
        {
          title: "Amazon",
          titleRight: "May 2022 - August 2022",
          description: "Software Development Engineering Internship",
          descriptionRight: " Los Angeles, CA",
          bullets: [
            "Developed linter to validate server-side renderings of the Amazon Alexa app served to tens of millions of users to reduce developer error rate by 30%",
            "Implemented the linter API with Java using JSON schemas and tree traversal for speeds 10x faster than typical JSON Schema validators",
            "Created an interactive UI for Amazon Alexa developers, 1000 engineers, to validate and develop Amazon Alexa pages created with TypeScript, React, TailwindCSS, and Recoil for state management",
          ],
        },
        {
          title: "Major League Hacking",
          titleRight: "May 2021 - August 2021",
          description: "Production Engineering Fellowship",
          descriptionRight: "Remote",
          bullets: [
            "Certified by the Linux Foundation in the essentials of system administration learning DevOps technologies: Docker, AWS, Bash, Python, and Linux",
            "Built full-stack Instagram clone using Flask and MongoDB for the user database",
            "Deployed app on an AWS EC2 using Docker-compose to containerize the app and orchestrate containers for monitoring using cAdvisor, reverse-proxying using Nginx, and data analytics using Prometheus visualized with Grafana",
            "Implemented CI/CD; automated linting, unit and integration testing, and deployment using GitHub Actions",
          ],
        },
        {
          title: "Trinity University",
          titleRight: "June 2020 - June 2021",
          description: "Computer Science Research Internship",
          descriptionRight: "San Antonio, TX",
          bullets: [
            "Second author of Photometric Renderings of Dust and Freed Regolith in Ring Simulations",
            "Engineered realistic 8,000,000 particle n-body simulation of Saturn's rings to have accurate photometric renderings of dust and freed regolith in Scala using the Monte Carlo method",
            "Enhanced rendering time by 6,400% by implementing parallelism on the K-D tree used to store the bodies",
          ],
        },
      ],
    },
    {
      title: "Technical Skills",
      blocks: [
        {
          title: "Programming Languages",
          bullets: ["Python", "Java", "C++", "JavaScript"],
          list: true,
        },
        {
          title: "Web Technologies",
          bullets: ["React", "Next.js", "Django", "TypeScript", "TailwindCSS"],
          list: true,
        },
        {
          title: "DevOps",
          bullets: ["AWS", "Docker", "Serverless", "GitHub Actions", "Bash"],
          list: true,
        },
        {
          title: "Other",
          bullets: ["Git", "SQL", "MongoDB"],
          list: true,
        },
      ],
    },
    {
      title: "Relevant Coursework",
      blocks: [
        {
          title: "Computer Science",
          bullets: [
            "Data Structures & Algorithms",
            "Web Development",
            "Numerical Analysis",
          ],
          list: true,
        },
        {
          title: "Mathematics",
          bullets: [
            "Calculus 1-3",
            "Differential Equations with Linear Algebra",
          ],
          list: true,
        },
      ],
    },
  ],
};

const About: NextPage = () => {
  return (
    <div>
      <Header forceOpen />
      <motion.div
        className="mt-24 px-8 sm:px-16 lg:px-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.7 }}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-medium py-4 mb-8 border-b-[1.5px] border-black">
            About
          </h1>
          <div className="flex justify-between">
            <div>
              <h3 className=" text-sm">Austin, TX, USA · He/Him</h3>
              <h3 className="text-sm">
                University of Texas at Austin (UT), Spring 2025
              </h3>
              <h3 className="text-sm  pb-4">BS in Astronomy</h3>
            </div>
            <div className="flex">
              {socialLinks.map(([label, href]) => (
                <Link href={href} key={label} passHref>
                  <a className="text-gray-600 mr-4 border-b border-gray-600 hover:border-black h-fit hover:text-black transition-all">
                    {label}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <p>
            Born and raised in San Antonio, Texas, I spent most of my early days
            playing around with my computer. I always wanted to automate things,
            so I naturally gravitated towards programming. I found my calling to
            Astronomy in high school, and I&apos;ve been interested in how the
            two fields can be combined since. I wrote my first published paper
            my senior year high school about computer simulations of bodies like
            Saturn. I also interned at Amazon in SWE shortly afterwards.
            Nowadays, I use my unique background of physics and math to solve
            complex problems in software engineering.
          </p>
        </div>
        <h2 className="text-4xl font-medium py-4 mb-8 border-b-[1.5px] border-black">
          Resume
        </h2>
        <div className=" leading-none text-sm sm:text-base">
          {currentResume.sections.map(({ title, blocks }) => (
            <div key={title} className="mb-4">
              <h3 className="text-xl pb-1 mb-4 border-b-[1.5px] border-black">
                {title}
              </h3>
              {blocks?.map(
                ({
                  title,
                  titleRight,
                  description,
                  descriptionRight,
                  bullets,
                  list,
                }) => (
                  <div key={title}>
                    {!list && (
                      <div className="mb-4">
                        <div className="flex justify-between">
                          <h4 className="font-semibold">{title}</h4>
                          <span>{titleRight}</span>
                        </div>
                        <div className="flex justify-between">
                          <h4>{description}</h4>
                          <span>{descriptionRight}</span>
                        </div>
                        <ul className="list-disc pl-4">
                          {bullets?.map((bullet, i) => (
                            <li key={i} className="mt-2">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {list && (
                      <div className="mb-1">
                        <span>
                          <span className="font-semibold">{title}: </span>
                          {bullets?.map((bullet, i) => (
                            <span key={i}>
                              {i === 0 ? bullet : `, ${bullet}`}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default About;
