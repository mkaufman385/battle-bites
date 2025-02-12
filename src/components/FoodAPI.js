import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ComparisonDisplay from "./ComparisonDisplay";

const FoodAPI = () => {
  const [foodData, setFoodData] = useState({
    healthyFood: {
      food_name: "Salad",
      calories: 150,
      protein: 5,
      carbohydrates: 10,
      fat: 5,
      image_url: "defaultHealthyFoodImage.jpg",
    },
    unhealthyFood: {
      food_name: "Pizza",
      calories: 300,
      protein: 10,
      carbohydrates: 35,
      fat: 12,
      image_url: "defaultUnhealthyFoodImage.jpg",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = process.env.REACT_APP_FATSECRET_API_KEY;
  const API_SECRET = process.env.REACT_APP_FATSECRET_API_SECRET;

  const TOKEN_URL = "https://oauth.fatsecret.com/connect/token";
  const API_URL = "https://platform.fatsecret.com/rest/server.api";

  const fetchFoods = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Get OAuth token
      const tokenResponse = await axios.post(
        TOKEN_URL,
        new URLSearchParams({
          grant_type: "client_credentials",
          scope: "basic",
        }),
        {
          headers: {
            Authorization: `Basic ${btoa(`${API_KEY}:${API_SECRET}`)}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const accessToken = tokenResponse.data.access_token;

      // Step 2: Search for healthy and unhealthy foods
      const healthyFoodsResponse = await axios.post(
        API_URL,
        new URLSearchParams({
          method: "foods.search",
          search_expression: "salad", // Example healthy food
          format: "json",
        }),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const unhealthyFoodsResponse = await axios.post(
        API_URL,
        new URLSearchParams({
          method: "foods.search",
          search_expression: "pizza", // Example unhealthy food
          format: "json",
        }),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const healthyFoodList = healthyFoodsResponse.data.foods.food;
      const unhealthyFoodList = unhealthyFoodsResponse.data.foods.food;

      // Step 3: Randomly select one food from each list
      const randomHealthyFood =
        healthyFoodList[Math.floor(Math.random() * healthyFoodList.length)];
      const randomUnhealthyFood =
        unhealthyFoodList[Math.floor(Math.random() * unhealthyFoodList.length)];

      // Step 4: Fetch detailed food data using food IDs
      const [healthyFoodDetailsResponse, unhealthyFoodDetailsResponse] =
        await Promise.all([
          axios.post(
            API_URL,
            new URLSearchParams({
              method: "food.get",
              food_id: randomHealthyFood.food_id,
              format: "json",
            }),
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          ),
          axios.post(
            API_URL,
            new URLSearchParams({
              method: "food.get",
              food_id: randomUnhealthyFood.food_id,
              format: "json",
            }),
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          ),
        ]);

      setFoodData({
        healthyFood: healthyFoodDetailsResponse.data.food,
        unhealthyFood: unhealthyFoodDetailsResponse.data.food,
      });
    } catch (err) {
      setError("Failed to fetch food data. Displaying default data.");
      console.error("Error fetching food data:", err);
    } finally {
      setLoading(false);
    }
  }, [API_KEY, API_SECRET]);

  useEffect(() => {
    fetchFoods(); // Call the fetchFoods function once on component mount
  }, [fetchFoods]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Ensure foodData is not null before passing to ComparisonDisplay */}
      {foodData && foodData.healthyFood && foodData.unhealthyFood && (
        <ComparisonDisplay foodData={foodData} />
      )}
    </div>
  );
};

export default FoodAPI;

// =======================================================================

// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import ComparisonDisplay from "./ComparisonDisplay";

// const FoodAPI = () => {
//   const [foodData, setFoodData] = useState({
//     healthyFood: {
//       food_name: "Salad",
//       calories: 150,
//       protein: 5,
//       carbohydrates: 10,
//       fat: 5,
//       image_url: "defaultHealthyFoodImage.jpg",
//     },
//     unhealthyFood: {
//       food_name: "Pizza",
//       calories: 300,
//       protein: 10,
//       carbohydrates: 35,
//       fat: 12,
//       image_url: "defaultUnhealthyFoodImage.jpg",
//     },
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const API_KEY = process.env.REACT_APP_FATSECRET_API_KEY;
//   const API_SECRET = process.env.REACT_APP_FATSECRET_API_SECRET;

//   const TOKEN_URL = "https://oauth.fatsecret.com/connect/token";
//   const API_URL = "https://platform.fatsecret.com/rest/server.api";

//   const fetchFoods = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       // Step 1: Get OAuth token
//       const tokenResponse = await axios.post(
//         TOKEN_URL,
//         new URLSearchParams({
//           grant_type: "client_credentials",
//           scope: "basic",
//         }),
//         {
//           headers: {
//             Authorization: `Basic ${btoa(`${API_KEY}:${API_SECRET}`)}`,
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         }
//       );

//       const accessToken = tokenResponse.data.access_token;

//       // Step 2: Search for healthy and unhealthy foods
//       const healthyFoodsResponse = await axios.post(
//         API_URL,
//         new URLSearchParams({
//           method: "foods.search",
//           search_expression: "salad", // Example healthy food
//           format: "json",
//         }),
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         }
//       );

//       const unhealthyFoodsResponse = await axios.post(
//         API_URL,
//         new URLSearchParams({
//           method: "foods.search",
//           search_expression: "pizza", // Example unhealthy food
//           format: "json",
//         }),
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         }
//       );

//       const healthyFoodList = healthyFoodsResponse.data.foods.food;
//       const unhealthyFoodList = unhealthyFoodsResponse.data.foods.food;

//       // Step 3: Randomly select one food from each list
//       const randomHealthyFood =
//         healthyFoodList[Math.floor(Math.random() * healthyFoodList.length)];
//       const randomUnhealthyFood =
//         unhealthyFoodList[Math.floor(Math.random() * unhealthyFoodList.length)];

//       // Step 4: Fetch detailed food data using food IDs
//       const [healthyFoodDetailsResponse, unhealthyFoodDetailsResponse] =
//         await Promise.all([
//           axios.post(
//             API_URL,
//             new URLSearchParams({
//               method: "food.get",
//               food_id: randomHealthyFood.food_id,
//               format: "json",
//             }),
//             {
//               headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 "Content-Type": "application/x-www-form-urlencoded",
//               },
//             }
//           ),
//           axios.post(
//             API_URL,
//             new URLSearchParams({
//               method: "food.get",
//               food_id: randomUnhealthyFood.food_id,
//               format: "json",
//             }),
//             {
//               headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 "Content-Type": "application/x-www-form-urlencoded",
//               },
//             }
//           ),
//         ]);

//       setFoodData({
//         healthyFood: healthyFoodDetailsResponse.data.food,
//         unhealthyFood: unhealthyFoodDetailsResponse.data.food,
//       });
//     } catch (err) {
//       setError("Failed to fetch food data. Displaying default data.");
//       console.error("Error fetching food data:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [API_KEY, API_SECRET]); // Memoizing fetchFoods with dependencies

//   useEffect(() => {
//     fetchFoods(); // Call the fetchFoods function once on component mount
//   }, [fetchFoods]); // Using the memoized fetchFoods function

//   return (
//     <div>
//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {foodData && <ComparisonDisplay foodData={foodData} />}
//     </div>
//   );
// };

// export default FoodAPI;
