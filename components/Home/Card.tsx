import { m, useInView } from "framer-motion";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRef } from "react";

interface CardProps {
  video?: boolean;
  src: string;
  width: number;
  height?: number;
  alt: string;
  heading: string;
  title: string;
  description: string;
  technologies: string;
  reverse?: boolean;
  date?: string;
  link?: string;
}

const Card = ({ video = false, reverse = false, ...props }: CardProps) => {
  const Asset = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, {
      amount: 0.5,
      once: true,
    });

    return (
      <m.div
        ref={ref}
        {...(inView && { animate: { opacity: 1, y: 0 } })}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 1.5, type: "spring", delay: 0.25 }}
        className={`shadow-2xl rounded-xl overflow-hidden h-fit ${
          video ? "w-fit" : "w-full"
        } `}
      >
        {(video && (
          <video
            src={props.src}
            width={props.width}
            muted
            autoPlay
            loop
            webkit-playsinline="true"
            playsInline
          />
        )) || (
          <Image
            src={props.src}
            width={props.width}
            height={props.height}
            layout="responsive"
            alt={props.alt}
          />
        )}
      </m.div>
    );
  };

  const Content = () => (
    <div
      className={`flex flex-col w-full justify-between grow ${
        reverse ? "text-right" : "text-left"
      }`}
    >
      <div>
        <span className="font-mono uppercase leading-loose">
          {(props.link && (
            <Link href={props.link}>
              {props.heading} {`~> View Project`}
            </Link>
          )) ||
            props.heading}
        </span>
        <h3 className="font-semibold text-3xl text-foreground/100">
          {props.title}
        </h3>
        <p>{props.date}</p>
      </div>
      <div>
        <p className="text-lg">{props.description}</p>
        <span className="font-mono text-sm uppercase leading-loose">
          {props.technologies}
        </span>
      </div>
    </div>
  );

  return (
    <div className="flex gap-12 max-w-normal flex-col lg:flex-row w-full items-center lg:items-stretch">
      {reverse ? <Content /> : <Asset />}
      {reverse ? <Asset /> : <Content />}
    </div>
  );
};

export default Card;
