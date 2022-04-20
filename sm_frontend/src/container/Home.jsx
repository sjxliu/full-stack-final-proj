import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";

import { SideBar, UserProfile } from "../components";
import { client } from "../client";
import logo from "../assets/volley-logo.png";
import Pins from "./Pins";
import { userQuery } from "../utilities/data";

export const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);

  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  // used for the 2nd link to get specfic user
  //undefined is no logged in user
  //storage clear for no user

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query)
    .then((data) => {
      setUser(data[0])
      // get one specfic user
    })

  }, []);
  // using sanity query to get user

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <SideBar />
      </div>
      <div className="flex md:hidden flex-row">
        <HiMenu
          fontSize={40}
          className="cursor-pointer"
          onClick={() => setToggleSidebar(false)}
        />
        <Link to="/">
          <img src={logo} alt="logo" className="w-28" />
        </Link>
        <Link to={"user-profile/${user?._id}"}>
          <img src={logo} alt="logo" className="w-28" />
        </Link>
      </div>
    </div>
  );
};
