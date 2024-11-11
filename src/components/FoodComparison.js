import axios from "axios";
import React, { useState } from "react";
import ComparisonDisplay from "./ComparisonDisplay";
import Spinner from "./Spinner";

function FoodComparison() {
  const [foodData, setFoodData] = useState(null);
  const [isComparing, setIsComparing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const fetchFoodComparison = async () => {
    setLoading(true);
    setError(null);
    setIsComparing(true);

    const accessToken = await fetchAccessToken();
    if (!accessToken) return;

    try {
      const foodId = 33691; // Example food ID, adjust this as needed
      const url = `/rest/server.api?method=food.get.v4&food_id=${foodId}&format=json`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const foodDetails = response.data.food;
      setFoodData({
        name: foodDetails.name,
        calories: foodDetails.calories,
        protein: foodDetails.protein,
        carbs: foodDetails.carbohydrate,
        fat: foodDetails.fat,
        fiber: foodDetails.fiber,
        sugar: foodDetails.sugar,
        vitaminC: foodDetails.vitamin_c,
        calcium: foodDetails.calcium,
        iron: foodDetails.iron,
      });
    } catch (error) {
      setError("Error gathering food data");
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Compare Your Foods</h2>
      <button className="compare-foods-button" onClick={fetchFoodComparison}>
        Compare Foods
      </button>

      {loading && <Spinner />}
      {error && <p>{error}</p>}

      <ComparisonDisplay foodData={foodData} isComparing={isComparing} />
    </div>
  );
}

export default FoodComparison;

// ---------------------------------------------------------------------------------------------------------------------------

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
//     const url = "https://oauth.fatsecret.com/connect/token";

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
//     setLoading(true);
//     setError(null);
//     setIsComparing(true);

//     const accessToken = await fetchAccessToken();
//     if (!accessToken) return;

//     try {
//       const foodId = 33691; // Example food ID, adjust this as needed
//       const url = `https://platform.fatsecret.com/rest/food/v4?food_id=${foodId}&format=json`;

//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       });

//       setFoodData(response.data); // Store the API response data
//     } catch (error) {
//       setError("Error gathering food data");
//       console.error("Error fetching data", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Compare Your Foods</h2>
//       <button className="compare-foods-button" onClick={fetchFoodComparison}>
//         Compare Foods
//       </button>

//       {loading && <Spinner />}
//       {error && <p>{error}</p>}

//       <ComparisonDisplay foodData={foodData} isComparing={isComparing} />
//     </div>
//   );
// }

// export default FoodComparison;
