import React, { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";

import { userCreated, userQuery } from "../utilities/data";
import { client } from "../client";
import Layout from "./Layout";
import Spinner from "./Spinner";

const UserProfile = () => {
  const [User, setUser] = useState(null);
  const [Pins, setPins] = useState(null);
  const [Text, setText] = useState("Created");
  const [ActiveBtn, setActiveBtn] = useState("created");

  const navigate = useNavigate();
  const { userId } = useParams();

  if(!User){
    return <Spinner/>
  }

  return <div>UserProfile</div>;
};

export default UserProfile;
