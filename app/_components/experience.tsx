"use client";

import Container from "@/components/container";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const experiences = [
  {
    org: "Atlassian",
    year: "2025",
    description: "Internal Datalake MCP Tooling",
    skills: ["Next.js", "TypeScript", "AWS", "DynamoDB", "Postgres", "MCP"],
    icon: "/atlassian.svg",
    hoverColor: "#0052cc",
    imageStyle: {},
  },
  {
    org: "Y'all Corporation",
    year: "2023 - 2025",
    description: "Co-founder & CTO",
    skills: [
      "React Native",
      "Expo",
      "Next.js",
      "tRPC",
      "Drizzle",
      "PostgreSQL",
      "WebSockets",
    ],
    icon: "",
    hoverColor: "#0f766e",
    imageStyle: {},
  },

  {
    org: "Amazon",
    year: "2023",
    description: "Alexa Mobile Device List Sorting",
    skills: ["React Native", "TypeScript", "Redux", "Apollo", "Jest", "QA"],
    icon: "/amazon.svg",
    hoverColor: "#232f3e",
    imageStyle: {
      transform: "scale(0.55) translate(0%, -182px)",
      height: "182px",
      width: "415px",
    },
  },
] as const;

const Experience = () => {
  return (
    <Container className="py-0 border-b">
      <div className="flex flex-col  border-x">
        {experiences.map((experience, i) => (
          <motion.div
            key={`${experience.org}-${experience.year}`}
            className={cn(
              "relative flex group border-b flex-col p-4 overflow-hidden",
              i === experiences.length - 1 && "border-b-0",
            )}
            whileHover={{
              backgroundColor: experience.hoverColor,
              color: "#fff",
            }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm">{experience.year}</p>
            <p className="text-3xl">{experience.org}</p>
            <p className="max-w-3xl pb-20">{experience.description}</p>
            <p className="relative z-20">
              {experience.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-block border py-1 text-xs px-2 rounded-full mr-2 "
                >
                  {skill}
                </span>
              ))}
            </p>
            {experience.icon && (
              <div className="absolute z-10 -bottom-8 group-hover:opacity-100 opacity-0 transition-opacity rotate-45 right-0">
                <img
                  src={experience.icon}
                  className="size-48"
                  style={experience.imageStyle}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </Container>
  );
};

export default Experience;
