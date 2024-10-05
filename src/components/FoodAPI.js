import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const FoodAPI = () => {
  const [data, setData] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api-endpoint-here", {
          headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "api-host-here",
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [API_KEY]);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default FoodAPI;
