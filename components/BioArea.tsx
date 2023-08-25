import React, { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { TbTrashXFilled } from "react-icons/tb";
import { Button } from "./ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";
import useProfileInfo from "@/stores/ProfileInfo";

const BioArea = () => {
  const { bio, setBio } = useProfileInfo();
  const [showBioEditor, setShowBioEditor] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <motion.div
      initial={{
        height: "auto",
      }}
      animate={{
        height: "auto",
      }}
      className="bg-white/5 ring ring-ring w-[35vw] relative rounded-md p-5"
    >
      {bio.length !== 0 && !showBioEditor && (
        <div
          className="absolute right-5 ring ring-red-500 p-1 rounded-full top-[50%] -translate-y-[50%] cursor-pointer"
          onClick={() => {
            setBio("");
            setCount(0);
          }}
        >
          <TbTrashXFilled className=" h-6 w-6 text-red-500" />
        </div>
      )}
      {!showBioEditor && bio.length === 0 && (
        <Button className="text-lg" onClick={() => setShowBioEditor(true)}>
          <Pencil2Icon className="h-5 w-5 mr-2" />
          Bio
        </Button>
      )}
      {!showBioEditor && bio.length !== 0 && (
        <div className="flex flex-col space-y-5">
          <div className=" flex space-x-3 w-full items-center">
            <h1 className="text-xl  ">{bio || ""}</h1>
          </div>
          <Button
            className="text-lg self-start"
            onClick={() => setShowBioEditor(true)}
          >
            <Pencil2Icon className="h-5 w-5 mr-2" />
            Edit
          </Button>
        </div>
      )}
      {showBioEditor && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col space-y-5"
        >
          <Textarea
            className="w-full h-20 bg-white/5 rounded-md p-5 max-h-[120px] text-lg  "
            placeholder="Tell us about yourself"
            value={bio || ""}
            maxLength={100}
            onChange={(e) => {
              setBio(e.target.value);
              setCount(e.target.value.length);
            }}
          />
          <div className="flex items-center justify-between">
            <Button
              className="text-lg self-start"
              onClick={() => setShowBioEditor(false)}
            >
              Save
            </Button>
            <p className="text-sm text-gray-400">{count}/100</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BioArea;
