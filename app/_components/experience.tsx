"use client";

import Container from "@/components/container";
import { cn } from "@/lib/utils";
import {
  motion,
  type MotionValue,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

const fallingItems = [
  { label: "Atlassian", kind: "company" },
  { label: "Amazon", kind: "company" },
  { label: "Meta", kind: "company" },
  { label: "Major League Hacking", kind: "company" },
  { label: "Trinity University", kind: "company" },
  { label: "Y'all Corporation", kind: "company" },
  { label: "Specra", kind: "company" },
  { label: "Longhorn Racing", kind: "company" },
  { label: "Next.js", kind: "tech" },
  { label: "TypeScript", kind: "tech" },
  { label: "React Native", kind: "tech" },
  { label: "AWS", kind: "tech" },
  { label: "DynamoDB", kind: "tech" },
  { label: "Postgres", kind: "tech" },
  { label: "tRPC", kind: "tech" },
  { label: "Drizzle", kind: "tech" },
  { label: "WebSockets", kind: "tech" },
  { label: "Python", kind: "tech" },
  { label: "Docker", kind: "tech" },
  { label: "Java", kind: "tech" },
  { label: "GraphQL", kind: "tech" },
  { label: "Redux", kind: "tech" },
  { label: "Jest", kind: "tech" },
  { label: "Flask", kind: "tech" },
  { label: "MongoDB", kind: "tech" },
  { label: "Prometheus", kind: "tech" },
  { label: "Grafana", kind: "tech" },
  { label: "Scala", kind: "tech" },
  { label: "Yjs", kind: "tech" },
  { label: "LlamaIndex", kind: "tech" },
  { label: "AWS Bedrock", kind: "tech" },
  { label: "React", kind: "tech" },
  { label: "Expo", kind: "tech" },
  { label: "OpenAI", kind: "tech" },
  { label: "AWS Lambda", kind: "tech" },
  { label: "API Gateway", kind: "tech" },
  { label: "EventBridge", kind: "tech" },
  { label: "CloudFormation", kind: "tech" },
  { label: "Boto3", kind: "tech" },
  { label: "Pytest", kind: "tech" },
  { label: "Localstack", kind: "tech" },
  { label: "Tailwind CSS", kind: "tech" },
  { label: "Recoil", kind: "tech" },
  { label: "GitHub Actions", kind: "tech" },
  { label: "Nginx", kind: "tech" },
  { label: "cAdvisor", kind: "tech" },
  { label: "Jotai", kind: "tech" },
  { label: "Neon", kind: "tech" },
  { label: "shadcn/ui", kind: "tech" },
  { label: "C++", kind: "tech" },
  { label: "NumPy", kind: "tech" },
] as const satisfies ReadonlyArray<{
  label: string;
  kind: "company" | "tech";
}>;

type FallingItem = (typeof fallingItems)[number];

const getChipLayout = (index: number) => {
  const columns = 6;
  const column = index % columns;
  const row = Math.floor(index / columns);
  const startY = -360 - row * 24 - column * 58;
  const startRotate = ((index % 9) - 4) * 5;
  const endRotate = (((row + column) % 5) - 2) * 4;

  return {
    startY,
    startRotate,
    endRotate,
  };
};

const ParallaxChip = ({
  item,
  index,
  scrollYProgress,
}: {
  item: FallingItem;
  index: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const layout = getChipLayout(index);
  const y = useTransform(scrollYProgress, [0, 1], [layout.startY, 0]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [layout.startRotate, layout.endRotate],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

  return (
    <motion.span
      className={cn(
        "z-10 select-none whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium leading-none will-change-transform sm:px-3 sm:py-1.5 sm:text-sm md:px-4 md:py-2 md:text-base",
        item.kind === "company"
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-foreground",
      )}
      style={{
        y,
        rotate,
        opacity,
      }}
    >
      {item.label}
    </motion.span>
  );
};

const ResumeGravity = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useMotionValue(0);
  const centerTextOpacity = useTransform(scrollYProgress, [0.38, 0.48], [0, 1]);
  const centerTextY = useTransform(scrollYProgress, [0.38, 0.48], [24, 0]);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const stage = stageRef.current;

        if (!stage) {
          return;
        }

        const rect = stage.getBoundingClientRect();
        const pageY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const maxScroll =
          document.documentElement.scrollHeight - viewportHeight;
        const stageTop = pageY + rect.top;
        const start = Math.max(0, stageTop - viewportHeight * 0.9);
        const end = Math.max(start + 1, Math.min(maxScroll, stageTop));
        const nextProgress = (pageY - start) / (end - start);

        scrollYProgress.set(Math.min(Math.max(nextProgress, 0), 1));
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [scrollYProgress]);

  return (
    <Container className="py-0 border-b">
      <section className="border-x">
        <div
          ref={stageRef}
          aria-label="Technologies and companies from Lance Ellis's resume"
          className="relative h-dvh min-h-[640px] overflow-hidden sm:min-h-[720px]"
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6 text-center"
            style={{ opacity: centerTextOpacity, y: centerTextY }}
          >
            <p className="max-w-[18rem] text-3xl font-medium leading-none tracking-normal sm:max-w-2xl sm:text-4xl md:text-5xl lg:max-w-3xl lg:text-6xl">
              Freelancing and developing for 5 years
            </p>
          </motion.div>

          <div className="absolute inset-0 flex flex-wrap content-evenly justify-evenly gap-x-1.5 gap-y-1 px-3 py-6 sm:gap-x-5 sm:gap-y-4 sm:px-8">
            {fallingItems.map((item, index) => (
              <ParallaxChip
                key={item.label}
                item={item}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default ResumeGravity;
