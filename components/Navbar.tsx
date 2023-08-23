import React from "react";
import { Badge, badgeVariants } from "@/components/ui/badge";
import Link from "next/link";
import { RocketIcon } from "@radix-ui/react-icons";

const Navbar = () => {
  return (
    <nav className="px-10 py-4 border-[1px] bg-secondary rounded-full flex justify-between items-center ring-2">
      <Badge className="px-4 cursor-default py-2 text-lg">Link.Me</Badge>

      <div className="flex items-center space-x-5">
        <Link
          className={badgeVariants({
            variant: "secondary",
            className:
              "px-4 py-2 ring-2 ring-ring hover:bg-ring hover:text-white text-lg",
          })}
          href="/"
        >
          About Us
        </Link>
        <Link
          className={badgeVariants({
            variant: "secondary",
            className:
              "px-4 py-2 ring-2 ring-ring hover:bg-ring hover:text-white text-lg",
          })}
          href="/"
        >
          Why Us
        </Link>

        <Link
          href="/login"
          className={badgeVariants({
            variant: "default",
            className:
              "px-4 py-2 flex items-center space-x-2 ring-2 ring-ring text-lg",
          })}
        >
          <h1>Get Started</h1>
          <RocketIcon />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
