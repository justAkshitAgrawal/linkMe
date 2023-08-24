import React, { useState } from "react";
import { motion } from "framer-motion";
import DashNav from "@/components/DashNav";
import { Button } from "@/components/ui/button";
import { Pencil2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";

import { profileViewAtom } from "@/atoms/profileView";
import { useRecoilState } from "recoil";

const Index = () => {
  const [showBioEditor, setShowBioEditor] = useState(false);
  const [profileView, setProfileView] = useRecoilState(profileViewAtom);

  return (
    <div className="h-screen bg-primary">
      <div className="px-20 py-14">
        <div>
          <DashNav />
        </div>

        <div className="mt-28 flex items-start space-x-10">
          <div className="flex-1 flex flex-col items-center  space-y-10">
            <motion.div
              initial={{
                height: 0,
              }}
              animate={{
                height: "auto",
              }}
              className="bg-white/5 ring ring-white w-[35vw]  rounded-md p-5"
            >
              {!showBioEditor && profileView.bio.length === 0 && (
                <Button
                  variant={"secondary"}
                  className="text-lg"
                  onClick={() => setShowBioEditor(true)}
                >
                  <Pencil2Icon className="h-5 w-5 mr-2" />
                  Bio
                </Button>
              )}
              {!showBioEditor && profileView.bio.length !== 0 && (
                <div className="flex flex-col space-y-5">
                  <div className=" flex space-x-3 w-full items-center">
                    <h1 className="text-xl text-white ">
                      {profileView.bio || ""}
                    </h1>
                  </div>
                  <Button
                    variant={"secondary"}
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
                  // transition={{ duration: 1.2 }}
                  className="flex flex-col space-y-5"
                >
                  <Textarea
                    className="w-full h-20 bg-white/5 rounded-md p-5 text-white max-h-[120px] text-lg"
                    placeholder="Tell us about yourself"
                    value={profileView.bio || ""}
                    onChange={(e) =>
                      setProfileView((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                  />
                  <Button
                    className="text-lg self-start"
                    variant={"secondary"}
                    onClick={() => setShowBioEditor(false)}
                  >
                    Save
                  </Button>
                </motion.div>
              )}
            </motion.div>

            <div className="bg-white/5 ring ring-white w-[35vw]  rounded-md p-5">
              <Button variant={"secondary"} className="text-lg ">
                <PlusCircledIcon className="h-5 w-5 mr-2" />
                New Link
              </Button>
            </div>
          </div>

          <div className="w-[28vw]">
            <div className=" ring-[10px] flex-1 ring-white border p-5 rounded-3xl h-[60vh] w-[16vw] mr-20">
              <div>
                <h1 className="text-lg text-white w-full text-center">
                  {profileView.bio || ""}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
