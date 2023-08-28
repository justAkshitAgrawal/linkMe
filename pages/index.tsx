import Navbar from "@/components/Navbar";
import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";

const Index = () => {
  return (
    <div className="min-h-screen bg-primary relative overflow-x-hidden">
      <Head>
        <title>Link.Me</title>
      </Head>
      <motion.div
        animate={{
          x: [0, 300, 0],
          y: [0, 400, 100, 0],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 4,
          ease: "easeInOut",
        }}
        className="absolute p-40 rounded-full bg-gradient-to-tr from-pink-500 to-blue-500 blur-[150px] h-80 w-80 top-64 left-52 max-sm:h-20 max-sm:w-20 max-sm:p-24 max-sm:top-20 max-sm:left-10"
      ></motion.div>

      <div className="px-20 py-14 max-sm:px-5 max-sm:py-10">
        <div>
          <Navbar />
        </div>

        <div className="mt-20 flex items-center space-x-10 max-sm:space-x-0 max-sm:flex-col max-sm:mt-14">
          <div className="flex-1 ml-10">
            <h1 className="text-white text-9xl max-sm:text-4xl font-semibold max-w-4xl">
              Share everything about you. All at one place. with{` `}
              <motion.span
                style={{
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                animate={{
                  background: [
                    "linear-gradient(43deg, #4158D0, #C850C0, #FFCC70)",
                    "linear-gradient(43deg, #FFCC70, #C850C0, #4158D0)",
                  ],
                  WebkitBackgroundClip: "text",
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1.4,
                  ease: "linear",
                }}
                className="cursor-pointer"
              >
                Link.Me
              </motion.span>
            </h1>
          </div>
          <div className="flex items-center relative">
            <img
              src="/linkMe.svg"
              alt=""
              className=" h-[70vh] max-sm:h-[40vh] mx-20 max-sm:mx-0 max-sm:mt-10 hover:rotate-6 transition-all"
            />
            <img
              src="/text.svg"
              alt=""
              className="absolute bottom-8 h-44 -rotate-[25deg] max-sm:hidden -left-24 cursor-pointer"
            />
            <img
              src="/arrow.svg"
              alt=""
              className="absolute bottom-10 h-24 -left- max-sm:hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
