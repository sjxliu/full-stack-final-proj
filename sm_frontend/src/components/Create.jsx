import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { client } from "../client";
import Spinner from "./Spinner";
import { categories } from "../utilities/data";

const Create = ({ user }) => {
  const [Title, setTitle] = useState("");
  const [About, setAbout] = useState("");
  const [Destination, setDestination] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Fields, setFields] = useState(null);
  const [Category, setCategory] = useState(null);
  const [ImageAsset, setImageAsset] = useState(null);
  const [WrongImg, setWrongImg] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];

    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setWrongImg(false);
      setLoading(true);

      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((doc) => {
          setImageAsset(doc);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error occurred while attempting upload", error);
        });
    } else {
      setWrongImg(true);
    }
  };

  const postPost = () => {
    if (Title && About && Destination && ImageAsset?._id && Category) {
      const doc = {
        _type: "pin",
        Title,
        About,
        Destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: ImageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
        Category,
      };
      client.create(doc).then(() => {
        navigate("/");
      });
    } else {
      setFields(true);
      setTimeout(() => setFields(false), 2000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {Fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">
          Please add (and play) all required fields
        </p>
      )}
      <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {Loading && <Spinner />}
            {WrongImg && <p>Wrong file type</p>}
            {!ImageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Upload</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Recommended Upload: high-quality JPG, JPEG, SVG, PNG, GIF or
                    TIFFs less than 20MB
                  </p>
                </div>
                <input
                  className="w-0 h-0"
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={ImageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  type="button"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
            placeholder="Title your post"
            type="text"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {user && (
            <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
              <img
                className="w-10 h-10 rounded-full"
                src={user.image}
                alt="user-profile"
              />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
          <input
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
            placeholder="Post description"
            type="text"
            value={About}
            onChange={(e) => setAbout(e.target.value)}
          />
          <input
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
            placeholder="Image Link"
            type="url"
            value={Destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <div className="flex flex-col">
            <div>
              <p lassName="mb-2 font-semibold text:lg sm:text-xl">
                Categorize Post
              </p>
              <select
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option className="sm:text-bg bg-white" value="others">
                  Select Category
                </option>
                {categories.map((Category) => (
                  <option
                    className="text-base border-0 outline-none capitalize bg-white text-black"
                    value={Category.name}
                  >
                    {Category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
                onClick={postPost}
                type="button"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
