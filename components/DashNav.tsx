import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { AiOutlineLogout } from "react-icons/ai";
import { RxExternalLink } from "react-icons/rx";

const DashNav = () => {
  return (
    <nav className="px-10 py-4 border-[1px] bg-secondary rounded-full flex justify-between items-center ring-2">
      <Badge className="px-4 cursor-default py-2 text-lg">
        Welcome, Akshit
      </Badge>

      <div className="flex items-center space-x-5">
        <Link href="/dashboard">
          <Badge
            variant={"secondary"}
            className="px-4 py-2 ring-2 ring-ring hover:bg-black hover:text-white text-lg cursor-pointer flex items-center space-x-2"
          >
            <h1>Links</h1>
          </Badge>
        </Link>
        <Link href="/about">
          <Badge
            variant={"secondary"}
            className="px-4 py-2 ring-2 ring-ring hover:bg-black hover:text-white text-lg cursor-pointer flex items-center space-x-2"
          >
            <h1>Appearance</h1>
          </Badge>
        </Link>
        <Link href="/about">
          <Badge
            variant={"secondary"}
            className="px-4 py-2 ring-2 ring-ring hover:bg-black hover:text-white text-lg cursor-pointer flex items-center space-x-2"
          >
            <h1>My Link.Me</h1>
            <RxExternalLink />
          </Badge>
        </Link>

        <Badge className="px-4 py-2 ring-2 ring-ring flex items-center space-x-2 hover:text-white text-lg cursor-pointer">
          <h1>Logout</h1>
          <AiOutlineLogout />
        </Badge>
      </div>
    </nav>
  );
};

export default DashNav;
