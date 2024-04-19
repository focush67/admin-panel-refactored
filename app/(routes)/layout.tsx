import Navbar from "@/components/others/navigation";
import Sidebar from "@/components/others/sidebar";
import { LayoutProps } from "@/types/globals";
import React from "react";

const HomeLayout = ({ children }: LayoutProps) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-4">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default HomeLayout;
