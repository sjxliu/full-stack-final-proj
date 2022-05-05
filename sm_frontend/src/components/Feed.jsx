import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import { feedQuery, searchQuery } from "../utilities/data";
import Layout from "./Layout";
import Spinner from "./Spinner";

function Feed() {
  const [Pins, setPins] = useState(null);
  const [Loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
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
  }, [categoryId]);
  if (Loading) return <Spinner message="Adding new plays soon!" />;
  return <div>
    {Pins && <Layout pins={Pins}/>}
  </div>;
}

export default Feed;
