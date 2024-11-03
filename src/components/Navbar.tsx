import React from "react";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  return (
    <div>
      <div>logo</div>
      <div>name</div>
      <div>
        <SidebarTrigger />
      </div>
    </div>
  );
};

export default Navbar;
