import React, { useState, useEffect } from "react";

import Layout from "./Layout";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utilities/data";
import Spinner from "./Spinner";

const Search = ({ searchTerm }) => {
  const [Pins, setPins] = useState(null);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase())

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {Loading && <Spinner message="Looking that up for you" />}
      {Pins?.length !== 0 && <Layout pins={Pins} />}
      {Pins?.length === 0 && searchTerm !== "" && !Loading && (
        <div className="mt-10 text-center text-xl ">
          <h2>No posts found!</h2>
        </div>
      )}
    </div>
  );
};

export default Search;
