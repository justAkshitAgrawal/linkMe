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
  getDocs,
  updateDoc,
} from "firebase/firestore";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { firestore } from "@/firebase";
import useUserStore from "@/stores/user";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";

const LinkView = () => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const { links, deleteLink, setLinks } = useProfileInfo();
  const { uid } = useUserStore();
  const [selectedIcon, setSelectedIcon] = useState(2);
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const icons = [
    {
      id: 0,
      icon: <AiFillLinkedin className="h-6 w-6 text-blue-600" />,
    },
    {
      id: 1,
      icon: <AiFillYoutube className="h-6 w-6 text-red-500" />,
    },
    {
      id: 2,
      icon: <AiFillGoogleCircle className="h-6 w-6" />,
    },
    {
      id: 3,
      icon: <AiFillBehanceCircle className="h-6 w-6" />,
    },
    {
      id: 4,
      icon: <AiFillDribbbleCircle className="h-6 w-6 text-pink-500" />,
    },
    {
      id: 5,
      icon: <AiFillGithub className="h-6 w-6" />,
    },
    {
      id: 6,
      icon: <AiOutlineLink className="h-6 w-6" />,
    },
    {
      id: 7,
      icon: <AiFillInstagram className="h-6 w-6 text-pink-400" />,
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

  const handleEdit = async (id: string) => {
    const docRef = doc(firestore, "users", uid);
    const linksCollectionRef = collection(docRef, "links");
    const querySnapshot = await getDocs(linksCollectionRef);

    // update link from firestore
    querySnapshot.forEach((doc) => {
      if (doc.id === id) {
        updateDoc(doc.ref, {
          name: linkName,
          url: linkUrl,
          iconId: selectedIcon,
        });
      }
    });

    // update link from state
    const newLinks = links?.map((link: any) => {
      if (link.id === id) {
        return {
          ...link,
          name: linkName,
          url: linkUrl,
          iconId: selectedIcon,
        };
      }
      return link;
    });

    setLinks(newLinks);
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
            {/* <div className="absolute right-14 top-[50%] -translate-y-[50%] ring-[2px] ring-ring cursor-pointer rounded-full p-1"> */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="absolute right-14 top-[50%] -translate-y-[50%] ring-[2px] ring-ring cursor-pointer rounded-full p-1">
                  <AiFillEdit
                    onClick={() => {
                      setSelectedIcon(link.iconId);
                      setLinkName(link?.name);
                      setLinkUrl(link.url);
                    }}
                    className="h-5 w-5"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Link</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <Input
                    value={linkName}
                    onChange={(e) => {
                      setLinkName(e.target.value);
                    }}
                  />
                  <Input
                    value={linkUrl}
                    onChange={(e) => {
                      setLinkUrl(e.target.value);
                    }}
                  />
                  <Label>Icon</Label>
                  <div className="flex flex-wrap">
                    {icons.map((icon) => {
                      return (
                        <div
                          onClick={() => {
                            setSelectedIcon(icon.id);
                          }}
                          className={twMerge(
                            "flex p-1 rounded-full items-center mr-2",
                            selectedIcon === icon.id ? " bg-gray-300" : ""
                          )}
                          key={icon.id}
                        >
                          {icon.icon}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <DialogClose>
                  <Button
                    type="submit"
                    onClick={() => {
                      handleEdit(link.id);
                      // close dialog
                    }}
                  >
                    Save changes
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
            {/* </div> */}
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
