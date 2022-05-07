import React, { useState, useEffect, useId } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";

import {
  userCreatedQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utilities/data";
import { client } from "../client";
import Layout from "./Layout";
import Spinner from "./Spinner";

const randomImg =
  "https://source.unsplash.com/1600x900/?volleyball,volleyballs,mikasa";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [User, setUser] = useState(null);
  const [Pins, setPins] = useState(null);
  const [Text, setText] = useState("Created");
  const [ActiveBtn, setActiveBtn] = useState("created");

  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [useId]);

  useEffect(() => {
    if (Text === "Created") {
      const createdPinsQuery = userCreatedQuery(userId);
      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [Text, useId]);

  const logout = () => {
    localStorage.clear();

    navigate("/login");
  };

  if (!User) {
    return <Spinner message="Loading profile" />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src={randomImg}
              alt="Yellow and blue volleyball by \@chaurasia from https://unsplash.com"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={User.image}
              alt="user pic"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">
            {User.userName}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            {userId === User?.googleId && (
              <GoogleLogout
                clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                render={(renderProps) => (
                  <button
                    type="button"
                    className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <AiOutlineLogout color="red" fontSize={21} />
                  </button>
                )}
                onLogoutSuccess={logout}
                cookiePolicy="single_host_origin"
              />
            )}
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("created");
            }}
            className={`${
              ActiveBtn === "created" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("saved");
            }}
            className={`${
              ActiveBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Saved
          </button>
        </div>

        <div className="px-2">
          <Layout pins={Pins} />
        </div>

        {Pins?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No Posts Found!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
