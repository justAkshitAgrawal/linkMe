import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import LinkInput from "./LinkInput";
import useProfileInfo from "@/stores/ProfileInfo";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {
  AiFillBehanceCircle,
  AiFillDelete,
  AiFillDribbbleCircle,
  AiFillEdit,
  AiFillGithub,
  AiFillGoogleCircle,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineLink,
} from "react-icons/ai";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { firestore } from "@/firebase";
import useUserStore from "@/stores/user";

const LinkView = () => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const { links, deleteLink } = useProfileInfo();
  const { uid } = useUserStore();

  const icons = [
    {
      id: 0,
      icon: <AiFillLinkedin className="h-5 w-5 text-blue-500" />,
    },
    {
      id: 1,
      icon: <AiFillYoutube className="h-5 w-5" />,
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
      icon: <AiFillDribbbleCircle className="h-5 w-5" />,
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
      icon: <AiFillInstagram className="h-5 w-5" />,
    },
  ];

  const handleDelete = async (id: string) => {
    const docRef = doc(firestore, "users", uid);
    const linksCollectionRef = collection(docRef, "links");
    const querySnapshot = await getDocs(linksCollectionRef);

    // delete link from firestore
    querySnapshot.forEach((doc) => {
      if (doc.id === id) {
        deleteDoc(doc.ref);
      }
    });
  };

  return (
    <ScrollArea className="bg-white/5 ring ring-ring w-[35vw] rounded-md p-5 h-[310px]">
      {links?.map((link: any) => {
        return (
          <Alert className="mb-3 relative" key={link.id}>
            <div
              onClick={() => {
                deleteLink(link.id);
                handleDelete(link.id);
              }}
              className="absolute right-3 top-[50%] -translate-y-[50%] ring-[2px] ring-red-500 cursor-pointer rounded-full p-1"
            >
              <AiFillDelete className="h-5 w-5 text-red-500" />
            </div>
            <div className="absolute right-14 top-[50%] -translate-y-[50%] ring-[2px] ring-ring cursor-pointer rounded-full p-1">
              <AiFillEdit className="h-5 w-5" />
            </div>
            {icons[link?.iconId]?.icon}
            <AlertTitle>{link?.name}</AlertTitle>
            <AlertDescription>
              <Button
                onClick={() => window.open(link?.url, "_blank")}
                className="p-0"
                variant={"link"}
              >
                {link?.url}
              </Button>
            </AlertDescription>
          </Alert>
        );
      })}
      {!showLinkInput && (
        <Button className="text-lg" onClick={() => setShowLinkInput(true)}>
          <PlusCircledIcon className="h-5 w-5 mr-2" />
          New Link
        </Button>
      )}
      {showLinkInput && <LinkInput setShowLinkInput={setShowLinkInput} />}
    </ScrollArea>
  );
};

export default LinkView;
