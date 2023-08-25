import React from "react";
import { motion } from "framer-motion";
import DashNav from "@/components/DashNav";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import BioArea from "@/components/BioArea";
import Profile from "@/components/Profile";
import useUserStore from "@/stores/user";

const Index = () => {
  const { uid, name } = useUserStore();
  console.log(uid, name);

  return (
    <div className="min-h-screen bg-primary">
      <div className="px-20 py-14">
        <div>
          <DashNav />
        </div>

        <div className="mt-28 flex items-start space-x-10">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="flex-1 flex flex-col items-center "
          >
            <div className="bg-white p-10 rounded-md ring-4 flex flex-col items-center space-y-8">
              <h1 className=" self-start text-4xl font-bold">
                Your{" "}
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
                >
                  Link.Me
                </motion.span>
              </h1>

              <BioArea />

              <div className="bg-white/5 ring ring-ring w-[35vw] h-fit rounded-md p-5">
                <Button className="text-lg ">
                  <PlusCircledIcon className="h-5 w-5 mr-2" />
                  New Link
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="w-[28vw]">
            <div className=" ring-[10px] flex-1 ring-white border p-5 rounded-3xl h-[60vh] w-[16vw] mr-20">
              <Profile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
