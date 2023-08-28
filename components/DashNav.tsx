import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { AiFillCopy, AiOutlineLogout } from "react-icons/ai";
import { RxExternalLink } from "react-icons/rx";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "@/firebase";
import useAuthStore from "@/stores/authStore";
import useUserStore from "@/stores/user";

const DashNav = () => {
  const router = useRouter();
  const { setLoggedIn } = useAuthStore();
  const { name, username } = useUserStore();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setLoggedIn(false);
        localStorage.removeItem("user");
        localStorage.removeItem("authUser");
        router.push("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <nav className="px-10 py-4 border-[1px] bg-secondary rounded-full flex justify-between items-center ring-2">
      <Badge className="px-4 cursor-default py-2 text-lg max-sm:hidden">
        Welcome{name?.split(" ")[0] ? ", " + name?.split(" ")[0] : ""}
      </Badge>

      <div className="flex items-center max-sm:space-x-0 max-sm:justify-between max-sm:w-full space-x-5">
        <AiFillCopy
          className=" h-6 w-6 max-sm:hidden cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(
              `https://link-me-gules.vercel.app/u/${username}`
            );
          }}
        />
        <Link href={`/u/${username}`} target="_blank">
          <Badge
            variant={"secondary"}
            className="px-4 py-2 ring-2 ring-ring hover:bg-black hover:text-white text-lg max-sm:text-xs cursor-pointer flex items-center space-x-2 max-sm:p-2"
          >
            <h1>
              <span className="max-sm:hidden">Link.me://</span>
              {username}
            </h1>
            <RxExternalLink className="max-sm:hidden" />
          </Badge>
        </Link>

        <Badge
          className="px-4 py-2 ring-2 ring-ring flex items-center space-x-2 hover:text-white text-lg max-sm:text-xs cursor-pointer max-sm:p-2"
          onClick={() => {
            handleLogout();
          }}
        >
          <h1>Logout</h1>
          <AiOutlineLogout />
        </Badge>
      </div>
    </nav>
  );
};

export default DashNav;
