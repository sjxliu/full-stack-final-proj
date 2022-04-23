import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIoArrowForward } from "react-icons/io";

import logo from "../assets/volley-logo.png";

const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";
const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";

const categories = [
  { name: "Animals" },
  { name: "Trends" },
  { name: "Art" },
  { name: "Gossip" },
  { name: "Gaming" },
];

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
    // if closeToggle NOT = to undefined then it will be false
    // this is because in Home passing closeToggle to setToggle while in another area not setting it
    // basically only call it if it exists
  };

  return (
    <div className="flex flex-col justify0between bg-white h-full overfull-y-scrikk min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5 ">
          <NavLink
            to="/"
            className={(isActive) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
            // using dynamic classname {} to check, built in NavLink function thru react-r-d
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover Categories
          </h3>
          {/* iterating through different categories, last one will be other */}
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`category/${category.name}`}
              className={(isActive) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link to={`user-profile/${user._id}`} className="flex my-5 mb-3 gap-2">
          {" "}
          <img
            src={user.image}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
