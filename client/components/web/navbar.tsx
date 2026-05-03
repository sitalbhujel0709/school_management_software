import React from "react";
import { SidebarTrigger } from "../ui/sidebar";

const Navbar = () => {
  return (
    <header className="border-b flex items-center gap-4 px-4 py-2">
      <SidebarTrigger />
      <h1 className="text-lg font-bold">School Management Software</h1>
    </header>
  );
};

export default Navbar;
