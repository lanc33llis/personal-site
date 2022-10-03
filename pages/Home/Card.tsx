import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  src: string;
  href: string;
  inViewAnimationDelay: number;
}

const Card = ({
  title,
  description,
  src,
  href,
  inViewAnimationDelay,
}: CardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      className="relative w-full lg:w-[calc(50%-.5rem)] "
      ref={ref}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -100 }}
      transition={{
        duration: 1.5,
        type: "spring",
        delay: inViewAnimationDelay,
      }}
    >
      <Link href={href ?? ""} passHref>
        <a>
          <div className="absolute left-0 top-0 opacity-0 hover:opacity-100 w-full h-full bg-[rgba(0,0,0,.9)] z-10 text-white flex items-center justify-center flex-col p-8 text-center transition-opacity">
            <h2>{title}</h2>
            <h3>{description}</h3>
          </div>
        </a>
      </Link>
      <div className="border border-gray-300">
        <Image
          src={src}
          layout="responsive"
          width={1.9}
          height={1}
          className="w-full h-full"
          alt="Card"
        />
      </div>
    </motion.div>
  );
};
Card.defaultProps = {
  inViewAnimationDelay: 0,
};

export default Card;
