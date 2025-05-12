import Image from "next/legacy/image";

import { m } from "framer-motion";
import { useState } from "react";

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedEmailTimer, setCopiedEmailTimer] = useState<any>();

  return (
    <div className="snap-center min-h-screen flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0">
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
      <m.div
        initial={{ opacity: 0, y: -25 }}
        animate={!loading ? { opacity: 1, y: 0 } : false}
        transition={{ duration: 1, type: "spring" }}
        className="flex flex-col justify-center w-full pt-16 lg:pt-0 lg:w-1/2 lg:text-left max-w-[640px]"
      >
        <h1 className="max-w-[500px] font-semibold text-foreground/80 lg:text-left text-center text-2xl md:text-5xl">
          I&apos;m
          <span className="text-foreground/100"> Lance Ellis</span>
          <br />
          {` a software engineer`}
          <br className="hidden lg:inline" />
          {` and designer.`}
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
          className="hidden text-xl text-left text-foreground/70 transition-all border-b border-foreground/70 cursor-pointer w-fit lg:block hover:text-foreground/100 h-fit hover:border-foreground/100"
        >
          {!copiedEmail ? "Email?" : "Email Copied!"}
        </span>
      </m.div>
      <div className="-z-10 relative flex items-center overflow-hidden h-full justify-center w-full lg:w-1/2 sm:p-4 md:p-8 lg:p-8 xl:p-12 max-w-[600px]">
        <div className="w-full h-fit relative">
          <m.div
            initial={{ opacity: 0, y: -100 }}
            animate={!loading ? { opacity: 0.95, y: 0 } : false}
            transition={{ duration: 2, type: "spring" }}
          >
            <Image
              style={{ clipPath: "url(#hero-image)" }}
              width={303}
              height={405}
              layout="responsive"
              src={"/DSC04476.jpg"}
              alt="picture of me by Enrique Rivera"
              onLoadingComplete={() => setLoading(false)}
              quality={50}
              priority
              className="brightness-105"
            />
            <svg className="absolute left-0 right-0 w-full h-full">
              <defs>
                <clipPath id="hero-image">
                  <m.rect
                    initial={{ y: "0", opacity: 0 }}
                    animate={!loading ? { y: "5%", opacity: 1 } : false}
                    transition={{ duration: 3, type: "spring" }}
                    x="2.5%"
                    width="30%"
                    height="60%"
                  />
                  <m.rect
                    initial={{ y: "0", opacity: 0 }}
                    animate={!loading ? { y: "20%", opacity: 1 } : false}
                    transition={{ duration: 2.75, type: "spring" }}
                    x="35%"
                    width="30%"
                    height="60%"
                  />
                  <m.rect
                    initial={{ y: "0%", opacity: 0 }}
                    animate={!loading ? { y: "35%", opacity: 1 } : false}
                    transition={{ duration: 2.5, type: "spring" }}
                    x="67.5%"
                    width="30%"
                    height="60%"
                  />
                </clipPath>
              </defs>
            </svg>
          </m.div>
        </div>
      </div>
      <m.div
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
          className="z-10 block mb-12 text-lg text-left text-foreground/70 transition-all border-b border-foreground/70 cursor-pointer w-fit lg:hidden hover:border-foreground/100 h-fit hover:text-foreground/100"
        >
          {!copiedEmail ? "Email?" : "Email Copied!"}
        </span>
      </m.div>
    </div>
  );
};

export default Hero;
