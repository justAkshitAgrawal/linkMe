import Navbar from "@/components/Navbar";
import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";

const index = () => {
  return (
    <div className="min-h-screen bg-primary">
      <Head>
        <title>About | Link.Me</title>
      </Head>
      <div className="px-20 py-14 max-sm:px-5 max-sm:py-10">
        <div>
          <Navbar />
        </div>

        <div className="mt-20 max-sm:mt-10 flex items-center space-x-10">
          <div className="flex-1 ml-10">
            <h1 className="text-white text-7xl max-sm:text-3xl font-semibold ">
              Welcome to{" "}
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
              {`, your platform to share and discover the essence of you. We're
              here to help you compile and showcase your passions,
              accomplishments, and interests all in one place.`}
              <br />
              <br />
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
              </motion.span>{" "}
              is where your digital identity comes to life, enabling you to
              express your unique story effortlessly.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
