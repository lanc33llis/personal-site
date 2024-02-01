import { motion, useInView } from "framer-motion";
import Image from "next/legacy/image";
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
}

const Card = ({ video = false, reverse = false, ...props }: CardProps) => {
  const Asset = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, {
      amount: 0.5,
      once: true,
    });

    return (
      <motion.div
        ref={ref}
        {...(inView && { animate: { opacity: 1, y: 0 } })}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5, type: "spring", delay: 0.25 }}
        className={`shadow-2xl rounded-xl overflow-hidden h-fit ${
          video ? "w-fit" : "w-full"
        } `}
      >
        {(video && (
          <video src={props.src} width={props.width} muted autoPlay loop />
        )) || (
          <Image
            src={props.src}
            width={props.width}
            height={props.height}
            layout="responsive"
            alt={props.alt}
          />
        )}
      </motion.div>
    );
  };

  const Content = () => (
    <div
      className={`flex flex-col w-full justify-between grow ${
        reverse ? "text-right" : "text-left"
      }`}
    >
      <div>
        <span className=" uppercase leading-loose tracking-[.2em]">
          {props.heading}
        </span>
        <h3 className="font-medium text-3xl">{props.title}</h3>
      </div>
      <div>
        <p className="text-lg">{props.description}</p>
        <span className="text-sm uppercase leading-loose tracking-[.2em]">
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
