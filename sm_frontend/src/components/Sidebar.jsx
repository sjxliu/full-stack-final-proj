import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIoArrowForward } from "react-icons/io";

import logo from "../assets/volley-logo.png";

const Sidebar = ({ user, closeToggle }) => {
  return (
    <div className="flex flex-col justify0between bg-white h-full overfull-y-scrikk min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link to="/"
        className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
        >
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
