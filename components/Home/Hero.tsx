import Image from "next/legacy/image";

import { m } from "framer-motion";
import { useState } from "react";

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedEmailTimer, setCopiedEmailTimer] = useState<any>();

  return (
    <div className="min-h-screen snap-center px-2 pt-12 sm:px-16 lg:px-24 lg:pt-0 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0">
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
        className="flex flex-col justify-center w-full pt-8 lg:pt-0 lg:w-1/2 max-w-[1322px] lg:text-left"
      >
        <h1 className="text-4xl font-semibold text-center sm:text-6xl lg:text-6xl xl:text-7xl lg:mb-4 lg:text-left">
          Hello, I&apos;m a web developer and designer.
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
          className="hidden ml-1 text-xl text-left text-muted-foreground transition-all border-b border-muted-foreground cursor-pointer w-fit lg:block hover:text-foreground h-fit hover:border-foreground"
        >
          {!copiedEmail ? "Email?" : "Email Copied!"}
        </span>
      </m.div>
      <div className="-z-10 relative flex items-center justify-center w-full md:h-screen lg:w-1/2 sm:p-4 md:p-8 lg:p-16 xl:p-24 max-w-[calc(2644px/2)]">
        <div className="w-full h-fit relative">
          <m.div
            initial={{ opacity: 0, y: -100 }}
            animate={!loading ? { opacity: 0.85, y: 0 } : false}
            transition={{ duration: 2, type: "spring" }}
          >
            <Image
              style={{ clipPath: "url(#hero-image)" }}
              width={303}
              height={405}
              layout="responsive"
              src={"/me.jpg"}
              alt="picture of me by Rae Xin"
              onLoadingComplete={() => setLoading(false)}
              quality={50}
              priority
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
                    rx={10}
                  />
                  <m.rect
                    initial={{ y: "0", opacity: 0 }}
                    animate={!loading ? { y: "20%", opacity: 1 } : false}
                    transition={{ duration: 2.75, type: "spring" }}
                    x="35%"
                    width="30%"
                    height="60%"
                    rx={10}
                  />
                  <m.rect
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
          className="z-10 block text-lg text-left text-muted-foreground transition-all border-b border-muted-foreground cursor-pointer w-fit lg:hidden hover:border-foreground h-fit hover:text-foreground"
        >
          {!copiedEmail ? "Email?" : "Email Copied!"}
        </span>
      </m.div>
    </div>
  );
};

export default Hero;
