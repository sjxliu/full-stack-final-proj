import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar, Feed, PinsDetails, Create, Search } from "../components";

const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // do in pins not search bc need to share across multiple components

  return (
    <div className="px-2 md:px-5">
      <div className="pg-gray-50">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user} />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categroyId" element={<Feed />} />
          <Route
            path="/pins-details/:pinId"
            element={<PinsDetails user={user && user} />}
          />
          <Route path="/create-pin" element={<Create user={user && user} />} />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
