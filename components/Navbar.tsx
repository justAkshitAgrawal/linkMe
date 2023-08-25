import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { RocketIcon } from "@radix-ui/react-icons";
import useAuthStore from "@/stores/authStore";

const Navbar = () => {
  const { loggedIn } = useAuthStore();
  return (
    <nav className="px-10 py-4 border-[1px] bg-secondary rounded-full flex justify-between items-center ring-2">
      <Link href="/">
        <Badge className="px-4 cursor-default py-2 text-lg">Link.Me</Badge>
      </Link>

      <div className="flex items-center space-x-5">
        <Link href="/about">
          <Badge
            variant={"secondary"}
            className="px-4 py-2 ring-2 ring-ring hover:bg-black hover:text-white text-lg cursor-pointer"
          >
            About Us
          </Badge>
        </Link>

        <Link href={loggedIn ? "/dashboard" : "/authentication"}>
          <Badge className="px-4 py-2 ring-2 ring-ring flex items-center space-x-2 hover:text-white text-lg cursor-pointer">
            <h1>{loggedIn ? "Dashboard" : "Get Started"}</h1>
            {!loggedIn && <RocketIcon />}
          </Badge>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
