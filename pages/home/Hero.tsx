import Image from "next/image";
import me from "../../public/me.jpg";

import { motion } from "framer-motion";
import { useState } from "react";

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedEmailTimer, setCopiedEmailTimer] = useState<any>();

  return (
    <div className="mt-20 lg:mt-0 px-8 !pt-0 pb-16 sm:p-16 lg:p-24 flex flex-col lg:flex-row items-center justify-center">
      <style jsx global>{`
        body {
          overflow-y: ${loading ? "hidden" : "auto"};
        }
      `}</style>
      {loading ? (
        <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-white ">
          <span className="select-none text-2xl leading-[50%] load-spinner pl-1"></span>
        </div>
      ) : null}
      <motion.div
        className="flex flex-col justify-center w-full lg:w-1/2 max-w-[calc(2644px/2)]  lg:text-left"
        initial={{ opacity: 0, y: -100 }}
        animate={!loading ? { opacity: 1, y: 0 } : false}
        transition={{ duration: 1, type: "spring" }}
      >
        <h1 className="text-4xl font-normal text-center sm:text-6xl lg:mb-4 lg:text-left">
          Hello, I&apos;m a software developer and designer.
        </h1>
        <span
          onClick={() => {
            navigator.clipboard.writeText("scdelance@gmail.com");
            setCopiedEmail(true);
            if (!copiedEmailTimer) {
              const timer = setTimeout(() => {
                setCopiedEmail(false);
                clearTimeout(timer);
                setCopiedEmailTimer(null);
              }, 2000);
              setCopiedEmailTimer(timer);
            }
          }}
          className="hidden ml-1 text-lg text-left text-gray-500 transition-all border-b border-gray-500 cursor-pointer w-fit lg:block hover:border-black h-fit hover:text-black"
        >
          {!copiedEmail ? "Email?" : "Email Copied!"}
        </span>
      </motion.div>
      <div className="relative flex items-center justify-center w-full 2xl:h-screen lg:w-1/2 sm:p-4 md:p-8 lg:p-16 xl:p-24 max-w-[calc(2644px/2)]">
        <div className="w-full h-full">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={!loading ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 2, type: "spring" }}
          >
            <Image
              style={{ clipPath: "url(#hero-image)" }}
              width={303}
              height={405}
              layout="responsive"
              src={me}
              alt="picture of me by Rae Xin"
              onLoadingComplete={() => setLoading(false)}
              priority
            />
          </motion.div>
          <svg className="absolute left-0 right-0 w-full h-full sm:p-4 md:p-8 lg:p-16 xl:p-24 2xl:p-24">
            <defs>
              <clipPath id="hero-image">
                <motion.rect
                  initial={{ y: "0", opacity: 0 }}
                  animate={!loading ? { y: "5%", opacity: 1 } : false}
                  transition={{ duration: 3, type: "spring" }}
                  x="2.5%"
                  width="30%"
                  height="60%"
                  rx={10}
                />
                <motion.rect
                  initial={{ y: "0", opacity: 0 }}
                  animate={!loading ? { y: "20%", opacity: 1 } : false}
                  transition={{ duration: 2.75, type: "spring" }}
                  x="35%"
                  width="30%"
                  height="60%"
                  rx={10}
                />
                <motion.rect
                  initial={{ y: "0%", opacity: 0 }}
                  animate={!loading ? { y: "35%", opacity: 1 } : false}
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
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: -100 }}
        animate={!loading ? { opacity: 1, y: 0 } : false}
        transition={{ duration: 1, type: "spring" }}
      >
        <span
          onClick={() => {
            navigator.clipboard.writeText("scdelance@gmail.com");
            setCopiedEmail(true);
            if (!copiedEmailTimer) {
              const timer = setTimeout(() => {
                setCopiedEmail(false);
                clearTimeout(timer);
                setCopiedEmailTimer(null);
              }, 2000);
              setCopiedEmailTimer(timer);
            }
          }}
          className="z-10 block text-lg text-left text-gray-500 transition-all border-b border-gray-500 cursor-pointer w-fit lg:hidden hover:border-black h-fit hover:text-black"
        >
          {!copiedEmail ? "Email?" : "Email Copied!"}
        </span>
      </motion.div>
    </div>
  );
};

export default Hero;
