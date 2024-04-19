import Link from "next/link";
import React from "react";
import MobileNavigation from "./mobile-nav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-gray-900 px-6 py-4 lg:px-10">
      <Link href={"/"} className="flex items-center gap-1"></Link>
      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
