import React, { useEffect, useState, useCallback } from "react";
import axios from "axios"; // Import axios
import ComparisonDisplay from "../components/ComparisonDisplay";
import "../styles/FoodComparison.css";

function FoodComparison() {
  const [foodData, setFoodData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        }).toString(),
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
      return null;
    }
  };

  const apiUrl = "https://platform.fatsecret.com/rest/server.api";

  const fetchFood = useCallback(async (foodName) => {
    try {
      const accessToken = await fetchAccessToken();
      if (!accessToken) {
        throw new Error("Unable to fetch access token");
      }

      const response = await axios.post(
        apiUrl,
        new URLSearchParams({
          method: "foods.search",
          search_expression: foodName,
          max_results: 1,
          format: "json",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = response.data;

      if (data?.foods?.food) {
        return Array.isArray(data.foods.food)
          ? data.foods.food[0]
          : data.foods.food;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching food: ${foodName}`, error);
      return null;
    }
  }, []);

  const formatFoodData = (healthy, unhealthy) => ({
    healthyFood: {
      food_name: healthy?.food_name || "Unknown",
      calories: healthy?.calories || 0,
      protein: healthy?.protein || 0,
      carbs: healthy?.carbohydrate || 0,
      fat: healthy?.fat || 0,
    },
    unhealthyFood: {
      food_name: unhealthy?.food_name || "Unknown",
      calories: unhealthy?.calories || 0,
      protein: unhealthy?.protein || 0,
      carbs: unhealthy?.carbohydrate || 0,
      fat: unhealthy?.fat || 0,
    },
  });

  useEffect(() => {
    const fetchExampleFoods = async () => {
      setIsLoading(true);
      try {
        const healthyFood = await fetchFood("apple");
        const unhealthyFood = await fetchFood("potato chips");
        setFoodData(formatFoodData(healthyFood, unhealthyFood));
      } catch (error) {
        console.error("Error fetching example foods:", error);
        setFoodData(null);
      }
      setIsLoading(false);
    };

    fetchExampleFoods();
  }, [fetchFood]);

  const handleCompareFoods = async () => {
    setIsLoading(true);
    const healthyOptions = ["broccoli", "banana", "spinach", "salmon"];
    const unhealthyOptions = ["pizza", "burger", "fries", "soda"];

    const randomHealthy =
      healthyOptions[Math.floor(Math.random() * healthyOptions.length)];
    const randomUnhealthy =
      unhealthyOptions[Math.floor(Math.random() * unhealthyOptions.length)];

    const healthyFood = await fetchFood(randomHealthy);
    const unhealthyFood = await fetchFood(randomUnhealthy);

    setFoodData(formatFoodData(healthyFood, unhealthyFood));
    setIsLoading(false);
  };

  return (
    <div className="food-comparison-page">
      <h1>Food Comparison</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : foodData ? (
        <ComparisonDisplay foodData={foodData} />
      ) : (
        <p>No data available</p>
      )}
      <button onClick={handleCompareFoods} className="compare-button">
        Compare Foods
      </button>
    </div>
  );
}

export default FoodComparison;

// -----------------------------------------------------------------------------

// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios"; // Import axios
// import ComparisonDisplay from "../components/ComparisonDisplay";
// import "../styles/FoodComparison.css";

// function FoodComparison() {
//   const [foodData, setFoodData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchAccessToken = async () => {
//     const clientId = process.env.REACT_APP_FATSECRET_CLIENT_ID;
//     const clientSecret = process.env.REACT_APP_FATSECRET_CLIENT_SECRET;
//     // const url = "/connect/token";
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
//             // Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
//             Authorization: `Basic ${window.btoa(
//               `${clientId}:${clientSecret}`
//             )}`,
//           },
//         }
//       );
//       return response.data.access_token;
//     } catch (error) {
//       console.error("Error fetching access token", error);
//       return null;
//     }
//   };

//   // const apiUrl = "/rest/server.api"; // Using the proxy path for food data request
//   const apiUrl = "https://platform.fatsecret.com/rest/server.api";

//   const fetchFood = useCallback(async (foodName) => {
//     try {
//       const accessToken = await fetchAccessToken();
//       if (!accessToken) {
//         throw new Error("Unable to fetch access token");
//       }

//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({
//           method: "foods.search",
//           search_expression: foodName,
//           max_results: 1,
//           format: "json",
//         }),
//       });

//       const data = await response.json();
//       return data?.foods?.food[0];
//     } catch (error) {
//       console.error(`Error fetching food: ${foodName}`, error);
//       return null;
//     }
//   }, []);

//   const formatFoodData = (healthy, unhealthy) => ({
//     healthyFood: {
//       food_name: healthy?.food_name || "Unknown",
//       calories: healthy?.nutritional_values?.calories || 0,
//       protein: healthy?.nutritional_values?.protein || 0,
//       carbs: healthy?.nutritional_values?.carbohydrate || 0,
//       fat: healthy?.nutritional_values?.fat || 0,
//     },
//     unhealthyFood: {
//       food_name: unhealthy?.food_name || "Unknown",
//       calories: unhealthy?.nutritional_values?.calories || 0,
//       protein: unhealthy?.nutritional_values?.protein || 0,
//       carbs: unhealthy?.nutritional_values?.carbohydrate || 0,
//       fat: unhealthy?.nutritional_values?.fat || 0,
//     },
//   });

//   useEffect(() => {
//     const fetchExampleFoods = async () => {
//       setIsLoading(true);
//       try {
//         const healthyFood = await fetchFood("apple");
//         const unhealthyFood = await fetchFood("potato chips");
//         setFoodData(formatFoodData(healthyFood, unhealthyFood));
//       } catch (error) {
//         console.error("Error fetching example foods:", error);
//         setFoodData(null);
//       }
//       setIsLoading(false);
//     };

//     fetchExampleFoods();
//   }, [fetchFood]);

//   const handleCompareFoods = async () => {
//     setIsLoading(true);
//     const healthyOptions = ["broccoli", "banana", "spinach", "salmon"];
//     const unhealthyOptions = ["pizza", "burger", "fries", "soda"];

//     const randomHealthy =
//       healthyOptions[Math.floor(Math.random() * healthyOptions.length)];
//     const randomUnhealthy =
//       unhealthyOptions[Math.floor(Math.random() * unhealthyOptions.length)];

//     const healthyFood = await fetchFood(randomHealthy);
//     const unhealthyFood = await fetchFood(randomUnhealthy);

//     setFoodData(formatFoodData(healthyFood, unhealthyFood));
//     setIsLoading(false);
//   };

//   return (
//     <div className="food-comparison-page">
//       <h1>Food Comparison</h1>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : foodData ? (
//         <ComparisonDisplay foodData={foodData} />
//       ) : (
//         <p>No data available</p>
//       )}
//       <button onClick={handleCompareFoods} className="compare-button">
//         Compare Foods
//       </button>
//     </div>
//   );
// }

// export default FoodComparison;
