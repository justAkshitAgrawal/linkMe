import { query, collection, where, getDocs } from "firebase/firestore"; // Import necessary Firestore modules
import { firestore } from "@/firebase"; // Import your Firestore instance
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

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
import { ImSpinner8 } from "react-icons/im";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import Head from "next/head";

type User = {
  name?: string;
  username?: string;
  email?: string;
  photoURL?: string;
  uid?: string;
  bio?: string;
  links?: any;
};

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

export default function UserProfile() {
  // read the username from the query param
  const router = useRouter();
  const { username } = router.query;

  const [user, setUser] = useState<User>({});
  const [links, setLinks] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if (username) {
      const getUser = async () => {
        const q = query(
          collection(firestore, "users"),
          where("username", "==", username)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          setUser(doc.data());
          // gather links from subcollection
          const linksCollectionRef = collection(doc.ref, "links");
          const querySnapshot = await getDocs(linksCollectionRef);
          const linksData: any = [];
          querySnapshot.forEach((linkDoc) => {
            linksData.push({ id: linkDoc.id, ...linkDoc.data() });
          });
          setLinks(linksData);
        });
        setLoading(false);
      };
      getUser();
    }
  }, [username]);

  return user?.name ? (
    <div className="h-screen bg-primary relative">
      <Head>
        <title>{user.name} | Link.Me</title>
      </Head>
      <img
        src="/bg2.jpg"
        className="absolute md:hidden h-full w-full max-md:object-cover "
        alt=""
      />
      <div className="flex flex-col items-center pt-20 h-full">
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
          className="flex p-[2px] mt-3 items-center rounded-full z-50"
        >
          <Avatar className="w-36 h-36">
            <AvatarImage src={user?.photoURL || ""} alt="Profile Image" />
            <AvatarFallback>UA</AvatarFallback>
          </Avatar>
        </motion.div>
        <h1 className="  text-white mt-10 text-2xl z-50">{user.name}</h1>
        <p className="text-white mt-3 text-lg z-50">{user.bio}</p>

        <ScrollArea className="flex items-center mt-10 p-2 flex-col z-50 h-[400px] max-md:h-[33vh]">
          <div className="flex flex-col items-center mt-6 px-5 space-y-5">
            {links?.map((link: any) => {
              return (
                <a
                  href={link?.url}
                  target="_blank"
                  rel="noreferrer"
                  key={link.id}
                  className="flex px-10 py-2 space-x-4 rounded-full items-center w-full text-white ring-[2px] ring-white"
                >
                  {icons[link?.iconId]?.icon}
                  <h1>{link?.name}</h1>
                </a>
              );
            })}
          </div>
        </ScrollArea>
      </div>
      <Link
        href="/"
        className=" fixed bottom-5 left-[50%] -translate-x-[50%] text-xl font-semibold"
      >
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
      </Link>
    </div>
  ) : (
    <div className="h-screen bg-primary flex items-center justify-center text-white relative">
      <Head>
        {loading ? (
          <title>Loading...</title>
        ) : (
          <title>User Not Found | Link.Me</title>
        )}
      </Head>
      {loading && (
        <div className=" h-full w-full bg-black flex items-center justify-center ">
          <ImSpinner8 className="animate-spin h-10 w-10" />
        </div>
      )}
      {!loading && !user?.name && (
        <h1 className=" max-md:text-2xl text-5xl">{`This user doesn't exist!`}</h1>
      )}
    </div>
  );
}
