import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase";
import useUserStore from "@/stores/user";
import useProfileInfo from "@/stores/ProfileInfo";

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

interface Props {
  setShowLinkInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const LinkInput = ({ setShowLinkInput }: Props) => {
  const [selectedIcon, setSelectedIcon] = useState(0);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const { uid } = useUserStore();
  const { setLinks } = useProfileInfo();

  const handleAddLink = async () => {
    const docRef = doc(firestore, "users", uid);
    const linksCollectionRef = collection(docRef, "links");
    const newLink = {
      name: title,
      url: url,
      iconId: selectedIcon,
    };
    addDoc(linksCollectionRef, newLink);
    const linksCollectionRefs = collection(docRef, "links");
    const querySnapshot = await getDocs(linksCollectionRefs);
    const links: any = [];
    querySnapshot.forEach((doc) => {
      links.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setLinks(links);
  };

  return (
    <div className="p-4 border">
      <h1 className=" font-semibold text-lg mb-2">New Link</h1>
      <Input
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        className="mt-3"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter Link URL"
      />

      <div className="flex items-center mt-3 text-sm rounded-md border p-2">
        <h1 className="">Select Icon: </h1>
        <div className="flex flex-wrap  ml-4">
          {icons.map((icon) => {
            return (
              <div
                onClick={() => setSelectedIcon(icon.id)}
                className={`flex p-1 rounded-full items-center mr-2 + ${
                  selectedIcon === icon.id ? " bg-gray-300" : ""
                }`}
                key={icon.id}
              >
                {icon.icon}
              </div>
            );
          })}
        </div>
      </div>
      <Button
        className=" self-start mt-4"
        onClick={() => {
          setShowLinkInput(false);
          handleAddLink();
          // updateBio();
        }}
      >
        Save
      </Button>
    </div>
  );
};

export default LinkInput;
