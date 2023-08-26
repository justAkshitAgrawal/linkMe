import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useProfileInfo from "@/stores/ProfileInfo";
import useUserStore from "@/stores/user";

const Profile = () => {
  const { bio } = useProfileInfo();
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

      <p className=" text-white text-sm text-center max-w-[12vw] break-words mt-3">
        {bio || ""}
      </p>

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
