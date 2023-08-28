import React from "react";
import { motion } from "framer-motion";
import DashNav from "@/components/DashNav";
import BioArea from "@/components/BioArea";
import Profile from "@/components/Profile";
import useUserStore from "@/stores/user";
import LinkView from "@/components/LinkView";
import Head from "next/head";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { RxExternalLink } from "react-icons/rx";

const Index = () => {
  const { uid, name, username } = useUserStore();

  return (
    <div className="min-h-screen bg-primary">
      <Head>
        <title>Dashboard | {name}</title>
      </Head>
      <div className="px-20 py-14 max-sm:px-5 max-sm:py-10">
        <div>
          <DashNav />
        </div>

        <div className="mt-28 flex items-start max-sm:flex-col space-x-10 max-sm:space-x-0 max-sm:items-center max-sm:mt-14">
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
              <h1 className=" self-start text-4xl max-sm:text-xl font-bold">
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

              <LinkView />

              <Link
                href={`/u/${username}`}
                className="sm:hidden"
                target="_blank"
              >
                <Badge
                  variant={"secondary"}
                  className="px-4 py-2 ring-2 ring-ring hover:bg-black hover:text-white text-lg max-sm:text-xs cursor-pointer flex items-center space-x-2 max-sm:p-2"
                >
                  <h1>Visit your profile</h1>
                  <RxExternalLink className="max-sm:h-3" />
                </Badge>
              </Link>
            </div>
          </motion.div>

          <div className="w-[28vw] max-sm:hidden">
            <div className=" ring-[10px] flex-1 ring-white border p-5 rounded-3xl h-[60vh] w-[16vw] max-sm:w-[60vw] mr-20">
              <Profile />
            </div>
          </div>

          <div className="sm:hidden mt-20 ring-[10px] flex-1 ring-white border p-5 rounded-3xl h-[60vh] w-[65vw] mr-20">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
