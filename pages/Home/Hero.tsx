import Image from "next/image";
import me from "../../public/me.jpg";

import { motion } from "framer-motion";
import { useState } from "react";

const Hero = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="mt-20 lg:mt-0 px-8 !pt-0 pb-16 sm:p-16 lg:p-24 flex flex-col lg:flex-row">
      {loading ? (
        <div className="absolute left-0 top-0 w-screen h-screen bg-white flex justify-center items-center z-50 ">
          <style jsx global>{`
            body {
              overflow: ${loading} : "hidden" : "auto";
            }
          `}</style>
          <span className="select-none text-2xl leading-[50%] load-spinner pl-1"></span>
        </div>
      ) : null}
      <motion.div
        className="mb-10 lg-mb-10 w-full lg:w-1/2 flex items-center justify-center text-center lg:text-left"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <h1 className="text-4xl sm:text-6xl font-normal">
          Hello, I&apos;m a software developer and designer.
        </h1>
      </motion.div>
      <div className="w-full lg:w-1/2 flex items-center justify-center relative sm:p-4 md:p-8 lg:p-16 xl:p-24 2xl:p-48">
        <div className="w-full h-full">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, type: "spring" }}
          >
            <Image
              style={{ clipPath: "url(#hero-image)" }}
              width={303}
              height={405}
              layout="responsive"
              src={me}
              alt="picture of me"
              onLoadingComplete={() => setLoading(false)}
              priority
            />
          </motion.div>
          <svg className="w-full h-full absolute left-0 right-0 sm:p-4 md:p-8 lg:p-16 xl:p-24 2xl:p-48">
            <defs>
              <clipPath id="hero-image">
                <motion.rect
                  initial={{ y: "0", opacity: 0 }}
                  animate={{ y: "5%", opacity: 1 }}
                  transition={{ duration: 3, type: "spring" }}
                  x="2.5%"
                  width="30%"
                  height="60%"
                  rx={10}
                />
                <motion.rect
                  initial={{ y: "0", opacity: 0 }}
                  animate={{ y: "20%", opacity: 1 }}
                  transition={{ duration: 2.75, type: "spring" }}
                  x="35%"
                  width="30%"
                  height="60%"
                  rx={10}
                />
                <motion.rect
                  initial={{ y: "0%", opacity: 0 }}
                  animate={{ y: "35%", opacity: 1 }}
                  transition={{ duration: 2.5, type: "spring" }}
                  x="67.5%"
                  width="30%"
                  height="60%"
                  rx={10}
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
