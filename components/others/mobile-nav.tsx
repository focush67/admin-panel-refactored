"use client";

import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { SidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {}

const MobileNavigation = ({}: MobileNavigationProps) => {
  const pathName = usePathname();
  return (
    <section className="w-full max-w-[265px] sm:block nd:hidden lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            className="block md:hidden lg:hidden cursor-pointer"
            src={"/icons/hamburger.svg"}
            width={36}
            height={36}
            alt="Yo"
          />
        </SheetTrigger>
        <SheetContent side={"left"} className="border-none bg-gray-900">
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                {SidebarLinks.map((item, index) => {
                  const isActive = pathName === item.route;
                  return (
                    <SheetClose asChild key={index}>
                      <Link
                        href={item.route}
                        className={cn(
                          "flex gap-4 items-center p-4 rounded-lg justify-start max-w-60",
                          {
                            "bg-blue-1": isActive,
                          }
                        )}
                      >
                        <item.icon size={24} />
                        <p className="font-semibold">{item.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNavigation;
