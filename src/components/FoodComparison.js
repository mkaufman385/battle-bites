import React, { useState } from "react";
import ComparisonDisplay from "./ComparisonDisplay";
import Spinner from "./Spinner";
import axios from "axios";

function FoodComparison() {
  const [foodData, setFoodData] = useState(null);
  const [isComparing, setIsComparing] = useState(false); // Track button click
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const API_KEY = process.env.REACT_APP_API_KEY;

  const fetchAccessToken = async () => {
    const clientId = process.env.REACT_APP_FATSECRET_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_FATSECRET_CLIENT_SECRET;
    const url = "https://oauth.fatsecret.com/connect/token";

    try {
      const response = await axios.post(
        url,
        new URLSearchParams({
          grant_type: "client_credentials",
          scope: "basic",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
          },
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.error("Error fetching access token", error);
      setError("Unable to authenticate with FatSecret API");
      return null;
    }
  };

  const fetchFoodComparison = async () => {
    setLoading(true);
    setError(null);
    setIsComparing(true);

    const accessToken = await fetchAccessToken();
    if (!accessToken) return; // Stop if token couldn't be fetched

    try {
      const response = await axios.get(
        "https://platform.fatsecret.com/rest/server.api?method=foods.search&search_expression=apple&format=json",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setFoodData(response.data); // Store API data
    } catch (error) {
      setError("Error gathering food data");
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  // const fetchFoodComparison = async () => {
  //   setLoading(true); // Show loading state
  //   setError(null); // Reset any previous errors
  //   setIsComparing(true);
  //   try {
  //     const response = await axios.get("https://api-endpoint-here", {
  //       headers: {
  //         "X-RapidAPI-Key": API_KEY,
  //         "X-RapidAPI-Host": "api-host-here",
  //       },
  //     });
  //     setFoodData(response.data); // Store API data
  //   } catch (error) {
  //     setError("Error gathering food data");
  //     console.error("Error fetching data", error);
  //   } finally {
  //     setLoading(false); // Stop loading
  //   }
  // };

  return (
    <div>
      <h2>Compare Your Foods</h2>
      <button className="compare-foods-button" onClick={fetchFoodComparison}>
        Compare Foods
      </button>

      {/* Conditional rendering for loading, error, and data */}
      {loading && <Spinner />}
      {error && <p>{error}</p>}

      {/* This message will go away when the button is pressed */}
      {/* {!foodData && !isComparing && (
        <p>Press the button to start comparing foods</p>
      )} */}

      {/* Pass foodData to ComparisonDisplay to display the results */}
      <ComparisonDisplay foodData={foodData} isComparing={isComparing} />
    </div>
  );
}

export default FoodComparison;

// ---------------------------------------------------------------------------------------------------------------------------

// import React, { useState } from "react";
// import ComparisonDisplay from "./ComparisonDisplay";
// import "../styles/FoodComparison.css";

// function FoodComparison() {
//   const [foodData, setFoodData] = useState(null);
//   const [isComparing, setIsComparing] = useState(false); // Track button click

//   const fetchFoodData = async () => {
//     setIsComparing(true); // Set to true when the button is pressed

//     try {
//       const response = await fetch("https://api-endpoint-here", {
//         headers: {
//           "x-api-key": process.env.REACT_APP_API_KEY,
//           "x-api-host": "api-host-here",
//         },
//       });

//       const data = await response.json();
//       setFoodData(data);
//     } catch (error) {
//       console.error("Error fetching food data:", error);
//     }
//   };

//   return (
//     <div className="food-comparison">
//       <button onClick={fetchFoodData}>Compare Foods</button>
//       <ComparisonDisplay foodData={foodData} isComparing={isComparing} />
//     </div>
//   );
// }

// export default FoodComparison;
