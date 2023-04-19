import React, { useEffect, useState } from "react";
import Trending from "./Trending";
import { trendingServicesApi } from "../../../apis/user";

function TrendingServices() {
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    trendingServicesApi()
      .then(({ data }) => {
        if (data.trending) {
          setTrending(data.trending);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="mt-10">
      <h3 className="md:text-3xl text-2xl text-dark font-bold text-center mb-10">
        Trending Services
      </h3>
      <div className="flex flex-wrap gap-3 justify-evenly my-3">
        {trending.map((trending) => {
          return (
            <Trending
              key={trending._id}
              image={trending?.image}
              title={trending?.service}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TrendingServices;
