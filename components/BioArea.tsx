import React, { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { TbTrashXFilled } from "react-icons/tb";
import { Button } from "./ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";
import useProfileInfo from "@/stores/ProfileInfo";
import useUserStore from "@/stores/user";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebase";

const BioArea = () => {
  const { bio, setBio } = useProfileInfo();
  const { uid } = useUserStore();
  const [showBioEditor, setShowBioEditor] = useState(false);
  const [count, setCount] = useState(0);

  const updateBio = () => {
    if (bio?.trim() !== "") {
      try {
        const docRef = doc(firestore, "users", uid);
        updateDoc(docRef, {
          bio: bio,
        });
      } catch (error) {}
    }
  };

  const clearBio = () => {
    setBio("");
    const docRef = doc(firestore, "users", uid);
    updateDoc(docRef, {
      bio: "",
    });
  };

  return (
    <motion.div
      initial={{
        height: "auto",
      }}
      animate={{
        height: "auto",
      }}
      className="bg-white/5 ring ring-ring w-[35vw] max-sm:w-[60vw] relative rounded-md p-5"
    >
      {bio?.length !== 0 && !showBioEditor && (
        <div
          className="absolute right-5 ring ring-red-500 p-1 rounded-full top-[50%] max-sm:ring-1 -translate-y-[50%] cursor-pointer"
          onClick={() => {
            setCount(0);
            clearBio();
          }}
        >
          <TbTrashXFilled className=" h-6 w-6 max-sm:h-4 max-sm:w-4 text-red-500" />
        </div>
      )}
      {!showBioEditor && bio?.length === 0 && (
        <Button className="text-lg" onClick={() => setShowBioEditor(true)}>
          <Pencil2Icon className="h-5 w-5 mr-2" />
          Bio
        </Button>
      )}
      {!showBioEditor && bio?.length !== 0 && (
        <div className="flex flex-col space-y-5">
          <div className=" flex space-x-3 w-full items-center">
            <h1 className="text-xl max-sm:text-lg  ">{bio || ""}</h1>
          </div>
          <Button
            className="text-lg max-sm:text-sm self-start"
            onClick={() => setShowBioEditor(true)}
          >
            <Pencil2Icon className="h-5 w-5 max-sm:h-4 max-sm:w-4 mr-2" />
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
            className="w-full h-20 bg-white/5 rounded-md p-5 max-h-[120px] text-lg max-sm:text-sm  "
            placeholder="Tell us about yourself"
            value={bio || ""}
            maxLength={100}
            onChange={(e) => {
              setBio(e.target.value);
              setCount(e.target.value.length);
            }}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center max-sm:flex-col max-sm:space-x-0 max-sm:space-y-2 space-x-2">
              <Button
                className="text-lg max-sm:text-sm max-sm:w-full self-start"
                onClick={() => {
                  setShowBioEditor(false);
                  updateBio();
                }}
              >
                Save
              </Button>
              <Button
                className="text-lg max-sm:text-sm self-start text-red-500"
                variant={"secondary"}
                onClick={() => {
                  setShowBioEditor(false);
                }}
              >
                Cancel
              </Button>
            </div>
            <p className="text-sm text-gray-400">{count}/100</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BioArea;
