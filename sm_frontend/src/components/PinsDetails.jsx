import React, { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { client, urlFor } from "../client";
import Layout from "./Layout";
import { morePinQuery, pinDetailQuery } from "../utilities/data";
import Spinner from "./Spinner";

const PinsDetails = ({ user }) => {
  const [Pins, setPins] = useState(null);
  const [PinDetails, setPinDetails] = useState(null);
  const [Comment, setComment] = useState("");
  const [AddComment, setAddComment] = useState(false);

  //ID of post
  const { pinId } = useParams();

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query).then((data) => {
        setPinDetails(data[0]);
        // by default returns array
        if (data[0]) {
          // if pin exists
          query = morePinQuery(data[0]);
          client.fetch(query).then((res) => setPins(res));
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if (!PinDetails) {
    return <Spinner message="Loading" />;
  }

  return (
    <>
      {PinDetails && (
        <div
          className="flex xl:flex-row flex-col m-auto bg-white"
          style={{ maxWidth: "1500px", borderRadius: "32px" }}
        >
          <div className="flex justify-center items-center md:items-start flex-initial">
            <img
              className="rounded-t-3xl rounded-b-lg"
              alt="user-post"
              src={PinDetails?.image && urlFor(PinDetails?.image).url()}
            />
          </div>
          <div className="w-full p-5 flex-1 xl:min-w-620">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <a
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                  href={`${PinDetails.image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              <a href={PinDetails.destination} rel="noreferrer" target="_blank">
                {PinDetails.destination}
              </a>
            </div>
            <div>
              <h1 className="text-4xl font-bold break-words mt-3">
                {PinDetails.title}
              </h1>
              <p className="mt-3">{PinDetails.about}</p>
            </div>
            <Link
              className="flex gap-2 mt-5 items-center bg-white rounded-lg "
              to={`user-profile/${PinsDetails.postedBy?._id}`}
            >
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={PinsDetails.postedBy?.image}
                alt="user-profile"
              />
              <p className="font-semibold capitalize">
                {PinsDetails.postedBy?.userName}
              </p>
            </Link>
            <h2 className="mt-5 text-2xl">Comments</h2>
            <div className="max-h-370 overflow-y-auto">
              {PinDetails?.comments?.map((i) => (
                <div
                  className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                  key={i.comments}
                >
                  <img
                    className="w-10 h-10 rounded-full cursor-pointer"
                    alt="user profile"
                    src={i.postedBy?.image}
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{i.postedBy?.userName}</p>
                    <p>{i.comments}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PinsDetails;
