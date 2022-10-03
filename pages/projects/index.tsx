import { motion } from "framer-motion";
import { NextPage } from "next";
import Header from "../components/Header";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "../components/Footer";

const Projects: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // scroll to anchor if provided in url
    const hash = router.asPath.split("#")[1];
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView();
      }
    }
  }, [router.asPath]);

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
        <h1 className="text-4xl font-medium py-4 mb-4 border-b-[1.5px] border-black">
          Projects
        </h1>
        <div className="border-b-[1.5px] border-black pb-4 mb-4" id="shipper">
          <h3 className="text-base leading-loose tracking-[.2em]">
            DESKTOP APPLICATION
          </h3>
          <h2 className="text-2xl">Shipper</h2>
          <div className="py-4">
            <Image
              src="/shipper.png"
              layout="responsive"
              width={1.9}
              height={1}
              alt="Shipper"
            />
            <h4 className="text-sm leading-loose tracking-[.2em]">
              TYPESCRIPT, RUST, REACT, EXPRESS
            </h4>
            <p>
              Shipper is an application used to deploy projects automatically.
              Shipper uses scripts to automatically determine the projects&apos;
              needs and configure the host.
            </p>
          </div>
        </div>
        <div className="border-b-[1.5px] border-black pb-4 mb-4" id="kiss">
          <h3 className="text-base leading-loose tracking-[.2em]">
            CREATIVE WEB APP
          </h3>
          <h2 className="text-2xl">Kiss</h2>
          <div className="py-4">
            <Image
              src="/kiss.png"
              layout="responsive"
              width={1.9}
              height={1}
              alt="Kiss"
            />
            <h4 className="text-sm leading-loose tracking-[.2em]">
              REACT, SASS, CANVAS API
            </h4>
            <p>
              Kiss was an project to test out the Canvas API. The background is
              created randomly from a monospace font with the ability to grow
              and diminish in brightness. The Canvas API is then used to
              downnsample video and convert the video into grayscale.
            </p>
          </div>
        </div>
        <div className="border-b-[1.5px] border-black pb-4 mb-4" id="coursemap">
          <h3 className="text-base leading-loose tracking-[.2em]">
            INTERACTIVE WEB APP
          </h3>
          <h2 className="text-2xl">UT Course Map</h2>
          <div className="py-4">
            <Image
              src="/ut-course-map.png"
              layout="responsive"
              width={1.9}
              height={1}
              alt="UT Course Map"
            />
            <h4 className="text-sm leading-loose tracking-[.2em]">
              NEXT.JS, REACT, PYTHON, SELENIUM
            </h4>
            <p>
              UT Course Map is a web application that visualizes the courses of
              the University of Texas at Austin as a network graph. Directed
              links are created between a course and its prerisquites. Data is
              scraped using a bot written in Python using Selenium.
            </p>
          </div>
        </div>
        <div className="border-b-[1.5px] border-black pb-4 mb-4" id="allday">
          <h3 className="text-base leading-loose tracking-[.2em]">
            SKETCH WEB APP
          </h3>
          <h2 className="text-2xl">Allday</h2>
          <div className="py-4">
            <Image
              src="/allday.png"
              layout="responsive"
              width={1.9}
              height={1}
              alt="UT Course Map"
            />
            <h4 className="text-sm leading-loose tracking-[.2em]">
              NEXT.JS, REACT, SASS
            </h4>
            <p>
              Sketch web app based on an eCommerce startup. Originally a
              full-fledged idea but now just a sketch.
            </p>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Projects;
