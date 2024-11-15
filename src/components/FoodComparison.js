// import axios from "axios";
// import React, { useState } from "react";
// import ComparisonDisplay from "./ComparisonDisplay";
// import Spinner from "./Spinner";

// function FoodComparison() {
//   const [foodData, setFoodData] = useState(null);
//   const [isComparing, setIsComparing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchAccessToken = async () => {
//     const clientId = process.env.REACT_APP_FATSECRET_CLIENT_ID;
//     const clientSecret = process.env.REACT_APP_FATSECRET_CLIENT_SECRET;
//     const url = "/connect/token";

//     try {
//       const response = await axios.post(
//         url,
//         new URLSearchParams({
//           grant_type: "client_credentials",
//           scope: "basic",
//         }),
//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
//           },
//         }
//       );
//       return response.data.access_token;
//     } catch (error) {
//       console.error("Error fetching access token", error);
//       setError("Unable to authenticate with FatSecret API");
//       return null;
//     }
//   };

//   const fetchFoodComparison = async () => {
//     const [foodData, setFoodData] = useState(null); // Stores the food data
//     const [error, setError] = useState(null); // Stores any errors encountered
//     const [foodSearch, setFoodSearch] = useState("apple"); // Search term for the foods
//     try {
//       // Update the URL to match the correct API endpoint
//       const url = `https://platform.fatsecret.com/rest/server.api?method=foods.search&search_expression=${encodeURIComponent(
//         foodSearch
//       )}&format=json`;

//       // Make the fetch call with proper authentication headers (use OAuth token if needed)
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${access_token}`, // Add your access token here
//         },
//       });

//       // Check if the response is successful
//       if (!response.ok) {
//         throw new Error("Failed to fetch food data");
//       }

//       // Parse the response data as JSON
//       const data = await response.json();

//       // Ensure there is valid data
//       if (data?.foods?.food?.length >= 2) {
//         const healthyFood = data.foods.food[0]; // Assuming the first item is healthy
//         const unhealthyFood = data.foods.food[1]; // Assuming the second item is unhealthy

//         // Update the state with the food data
//         setFoodData({ healthyFood, unhealthyFood });
//       } else {
//         throw new Error("Not enough food data for comparison");
//       }
//     } catch (error) {
//       // Log and display any errors
//       console.error("Error fetching data:", error);
//       setError(error.message); // Set an error state to display error message
//     }
//   };

//   return (
//     <div>
//       <button onClick={fetchFoodComparison}>Compare Foods</button>

//       {error && <p style={{ color: "red" }}>Error: {error}</p>}

//       {foodData ? (
//         <ComparisonDisplay foodData={foodData} />
//       ) : (
//         <p>Press the button to compare foods</p>
//       )}
//     </div>
//   );
// }

// export default FoodComparison;

// -----------------------------------------------------------------------------

import axios from "axios";
import React, { useState } from "react";
import ComparisonDisplay from "./ComparisonDisplay";
import Spinner from "./Spinner";

function FoodComparison() {
  const [foodData, setFoodData] = useState(null);
  const [isComparing, setIsComparing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [foodSearch, setFoodSearch] = useState("apple"); // Search term for the foods

  // Fetch the access token needed for API authentication
  const fetchAccessToken = async () => {
    const clientId = process.env.REACT_APP_FATSECRET_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_FATSECRET_CLIENT_SECRET;
    const url = "/connect/token";

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

  // Function to fetch food comparison data
  const fetchFoodComparison = async () => {
    setLoading(true);
    setError(null);
    setIsComparing(true);

    const accessToken = await fetchAccessToken();
    if (!accessToken) return;

    try {
      // Construct the correct URL with the proxy path
      const url = `/rest/server.api?method=foods.search&search_expression=${encodeURIComponent(
        foodSearch
      )}&format=json`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Ensure the response data structure is valid
      if (response.data?.foods?.food?.length >= 2) {
        const healthyFood = response.data.foods.food[0]; // Assuming the first item is healthy
        const unhealthyFood = response.data.foods.food[1]; // Assuming the second item is unhealthy

        // Update the state with the food data
        setFoodData({ healthyFood, unhealthyFood });
      } else {
        throw new Error("Not enough food data for comparison");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message); // Display error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchFoodComparison}>Compare Foods</button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {loading && <Spinner />}

      {foodData ? (
        <ComparisonDisplay foodData={foodData} />
      ) : (
        <p>Press the button to compare foods</p>
      )}
    </div>
  );
}

export default FoodComparison;
