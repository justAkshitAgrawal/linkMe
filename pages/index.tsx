import Navbar from "@/components/Navbar";
import React from "react";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="h-screen bg-primary relative">
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
        className="absolute p-40 rounded-full bg-gradient-to-tr from-pink-500 to-blue-500 blur-[150px] h-80 w-80 top-64 left-52"
      ></motion.div>

      <div className="px-20 py-14">
        <div>
          <Navbar />
        </div>

        <div className="mt-20 flex items-center space-x-10">
          <div className="flex-1 ml-10">
            <h1 className="text-white text-9xl font-semibold max-w-4xl">
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
              className=" h-[70vh] mx-20 hover:rotate-6 transition-all"
            />
            <img
              src="/text.svg"
              alt=""
              className="absolute bottom-8 h-44 -rotate-[25deg] -left-24 cursor-pointer"
            />
            <img
              src="/arrow.svg"
              alt=""
              className="absolute bottom-10 h-24 -left-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;