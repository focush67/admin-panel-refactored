"use client";

import { SidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-gray-900 p-6 pt-28 text-white max-sm:hidden lg:w-[265px]">
      <div className="flex flex-1 flex-col gap-6">
        {SidebarLinks.map((item, index) => {
          const isActive =
            pathName === item.route || pathName.startsWith(`${item.route}/`);

          console.log(pathName);
          return (
            <Link
              href={item.route}
              key={index}
              className={cn(
                "flex gap-4 items-center p-4 rounded-lg justify-start",
                {
                  "bg-blue-1": isActive,
                }
              )}
            >
              <item.icon size={24} />

              <p className="text-lg font-semibold max-lg:hidden">
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
