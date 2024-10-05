// import React from "react";
// import ComparisonDisplay from "./ComparisonDisplay";

// function FoodComparison() {
//   return (
//     // <div>
//     //   <div>Food 1 here</div>
//     //   <div>Food 2 here</div>
//     // </div>

//     <div>
//       <h2>Compare Your Foods</h2>
//       <div>{<ComparisonDisplay />} </div>
//     </div>
//   );
// }

// export default FoodComparison;

import React, { useState } from "react";
import ComparisonDisplay from "./ComparisonDisplay";
import axios from "axios";

function FoodComparison() {
  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;

  const fetchFoodComparison = async () => {
    setLoading(true); // Show loading state
    setError(null); // Reset any previous errors
    try {
      const response = await axios.get("https://api-endpoint-here", {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "api-host-here",
        },
      });
      setFoodData(response.data); // Store API data
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h2>Compare Your Foods</h2>
      <button onClick={fetchFoodComparison}>Compare Foods</button>{" "}
      {/* Button to trigger API */}
      {/* Conditional rendering for loading, error, and data */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {/* Pass foodData to ComparisonDisplay to display the results */}
      <ComparisonDisplay foodData={foodData} />
    </div>
  );
}

export default FoodComparison;
