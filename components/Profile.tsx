import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useProfileInfo from "@/stores/ProfileInfo";
import useUserStore from "@/stores/user";

import {
  AiFillBehanceCircle,
  AiFillDribbbleCircle,
  AiFillGithub,
  AiFillGoogleCircle,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineLink,
} from "react-icons/ai";

import { ScrollArea } from "./ui/scroll-area";

const icons = [
  {
    id: 0,
    icon: <AiFillLinkedin className="h-5 w-5 text-blue-600" />,
  },
  {
    id: 1,
    icon: <AiFillYoutube className="h-5 w-5 text-red-500" />,
  },
  {
    id: 2,
    icon: <AiFillGoogleCircle className="h-5 w-5" />,
  },
  {
    id: 3,
    icon: <AiFillBehanceCircle className="h-5 w-5" />,
  },
  {
    id: 4,
    icon: <AiFillDribbbleCircle className="h-5 w-5 text-pink-500" />,
  },
  {
    id: 5,
    icon: <AiFillGithub className="h-5 w-5" />,
  },
  {
    id: 6,
    icon: <AiOutlineLink className="h-5 w-5" />,
  },
  {
    id: 7,
    icon: <AiFillInstagram className="h-5 w-5 text-pink-400" />,
  },
];

const Profile = () => {
  const { bio, links } = useProfileInfo();
  const { name, photoURL } = useUserStore();

  return (
    <div className="flex flex-col items-center h-full relative">
      <motion.div
        animate={{
          background: [
            "linear-gradient(43deg, #4158D0, #C850C0, #FFCC70)",
            "linear-gradient(43deg, #FFCC70, #C850C0, #4158D0)",
          ],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1.4,
          ease: "linear",
        }}
        className="flex p-[2px] mt-3 items-center rounded-full"
      >
        <Avatar className="w-24 h-24">
          <AvatarImage src={photoURL || ""} alt="Profile Image" />
          <AvatarFallback>UA</AvatarFallback>
        </Avatar>
      </motion.div>

      <h1 className="text-white mt-3 text-lg">{name}</h1>

      <p className=" text-white text-sm text-center max-w-[12vw] max-sm:max-w-[40vw] break-words mt-3">
        {bio || ""}
      </p>

      <ScrollArea className="w-full h-[300px] py-2">
        <div className="flex flex-col w-full items-center mt-6 px-5 space-y-5">
          {links?.map((link: any) => {
            return (
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                key={link.id}
                className="flex items-center justify-center space-x-3 text-white hover:text-gray-300 ring-[2px] ring-white w-full p-2 rounded-full text-sm"
              >
                {icons[link?.iconId]?.icon}
                <span className="">{link.name}</span>
                {link.icon}
              </a>
            );
          })}
        </div>
      </ScrollArea>

      <h1 className=" absolute bottom-0">
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
    </div>
  );
};

export default Profile;
